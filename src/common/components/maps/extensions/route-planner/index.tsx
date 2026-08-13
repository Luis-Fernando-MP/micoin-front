import {
  type FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Pressable, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

import Button from '@/common/components/button'
import Input from '@/common/components/input'
import {
  fetchOsrmRoute,
  type PlaceOption,
  searchNominatim,
} from '@/common/components/maps/extensions/route-planner/hooks'
import { type LatLng } from '@/common/components/maps/types'
import BRAND from '@/common/components/shared/brand'
import Text from '@/common/components/text'
import { showToast } from '@/common/components/toast'
import { getLocationSnapshot } from '@/common/device/location'
import { cn } from '@/lib/utils'

interface Props {
  origin?: PlaceOption | null
  destination?: PlaceOption | null
  localPlaces?: PlaceOption[]
  height?: number
  onRoute?: (meta: { km: string; min: number }) => void
}

const DEFAULT_ORIGIN: PlaceOption = {
  id: 'local-sv',
  label: 'San Salvador centro',
  subtitle: 'El Salvador',
  coord: { latitude: 13.6929, longitude: -89.2182 },
}

const DEFAULT_DESTINATION: PlaceOption = {
  id: 'local-airport',
  label: 'Aeropuerto Internacional',
  subtitle: 'El Salvador',
  coord: { latitude: 13.4409, longitude: -89.0557 },
}

const DEFAULT_PLACES: PlaceOption[] = [
  DEFAULT_ORIGIN,
  DEFAULT_DESTINATION,
  {
    id: 'local-centro',
    label: 'Centro Histórico',
    subtitle: 'San Salvador',
    coord: { latitude: 13.6989, longitude: -89.1914 },
  },
  {
    id: 'local-multiplaza',
    label: 'Multiplaza',
    subtitle: 'Antiguo Cuscatlán',
    coord: { latitude: 13.6766, longitude: -89.2502 },
  },
  {
    id: 'local-estadio',
    label: 'Estadio Cuscatlán',
    subtitle: 'San Salvador',
    coord: { latitude: 13.6806, longitude: -89.2224 },
  },
  {
    id: 'local-santa-tecla',
    label: 'Santa Tecla',
    subtitle: 'La Libertad',
    coord: { latitude: 13.6769, longitude: -89.2797 },
  },
]

const PlaceAutocomplete: FC<{
  label: string
  value: string
  selected?: PlaceOption | null
  places: PlaceOption[]
  onChangeText: (text: string) => void
  onSelect: (place: PlaceOption) => void
}> = ({ label, value, selected, places, onChangeText, onSelect }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<PlaceOption[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    const q = value.trim()
    if (q.length < 2) {
      setOptions([])
      setLoading(false)
      return
    }

    setLoading(true)
    timer.current = setTimeout(() => {
      void (async () => {
        const local = places.filter((place) =>
          `${place.label} ${place.subtitle}`
            .toLowerCase()
            .includes(q.toLowerCase()),
        )
        let remote: PlaceOption[] = []
        try {
          remote = await searchNominatim(`${q}, El Salvador`)
        } catch {
          remote = []
        }
        const merged = [...local, ...remote].filter(
          (place, index, arr) =>
            arr.findIndex((item) => item.id === place.id) === index,
        )
        setOptions(merged.slice(0, 8))
        setLoading(false)
      })()
    }, 350)

    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [places, value])

  return (
    <View className="gap-1.5">
      <Text className="text-xs font-medium text-secondary">{label}</Text>
      <Input
        value={value}
        onChangeText={(text) => {
          onChangeText(text)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Escribe un lugar…"
        size="sm"
      />
      {selected && (
        <Text className="text-xs text-secondary" numberOfLines={1}>
          Elegido: {selected.label}
        </Text>
      )}
      {open && value.trim().length >= 2 && (
        <View
          className={cn(
            'border border-border bg-card',
            BRAND.radius.variants.control,
          )}
        >
          {loading && (
            <Text className="px-3 py-2 text-xs text-secondary">Buscando…</Text>
          )}
          {!loading && !options.length && (
            <Text className="px-3 py-2 text-xs text-secondary">
              Sin resultados
            </Text>
          )}
          {options.map((place) => (
            <Pressable
              key={place.id}
              className="border-b border-border px-3 py-2"
              onPress={() => {
                onSelect(place)
                onChangeText(place.label)
                setOpen(false)
              }}
            >
              <Text className="text-sm font-medium">{place.label}</Text>
              {place.subtitle && (
                <Text className="text-xs text-secondary" numberOfLines={1}>
                  {place.subtitle}
                </Text>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

/**
 * RoutePlanner — mapa A→B con autocomplete y polyline OSRM.
 *
 * Extiende Maps para origen/destino, sugerencias locales + Nominatim
 * y cálculo de la mejor ruta de manejo.
 *
 * @param origin - Punto A inicial
 * @param origin.origin
 * @param destination - Punto B inicial
 * @param origin.destination
 * @param localPlaces - Sugerencias locales extra
 * @param origin.localPlaces
 * @param height - Alto del mapa en px. @default 220
 * @param origin.height
 * @param onRoute - Callback con km y minutos al calcular
 *
 * @param origin.onRoute
 * @example
 * import Maps from '@/common/components/maps';
 * <Maps.RoutePlanner />
 */
const RoutePlanner: FC<Props> = ({
  origin = DEFAULT_ORIGIN,
  destination = DEFAULT_DESTINATION,
  localPlaces = DEFAULT_PLACES,
  height = 220,
  onRoute,
}) => {
  const mapRef = useRef<MapView>(null)
  const [queryA, setQueryA] = useState((origin ?? DEFAULT_ORIGIN).label)
  const [queryB, setQueryB] = useState(
    (destination ?? DEFAULT_DESTINATION).label,
  )
  const [placeA, setPlaceA] = useState<PlaceOption | null>(
    origin ?? DEFAULT_ORIGIN,
  )
  const [placeB, setPlaceB] = useState<PlaceOption | null>(
    destination ?? DEFAULT_DESTINATION,
  )
  const [coords, setCoords] = useState<LatLng[]>([])
  const [meta, setMeta] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const initialRegion = useMemo(
    () => ({
      ...DEFAULT_ORIGIN.coord,
      latitudeDelta: 0.35,
      longitudeDelta: 0.35,
    }),
    [],
  )

  const onUseMyLocation = useCallback(async () => {
    const snap = await getLocationSnapshot()
    if (!snap.ok) {
      showToast({ title: 'Ubicación denegada', status: 'warning' })
      return
    }
    const mine: PlaceOption = {
      id: 'me',
      label: 'Mi ubicación',
      subtitle: `${snap.lat}, ${snap.lng}`,
      coord: { latitude: snap.lat, longitude: snap.lng },
    }
    setPlaceA(mine)
    setQueryA(mine.label)
  }, [])

  const onCalculate = useCallback(async () => {
    if (!placeA || !placeB) {
      return
    }
    setBusy(true)
    try {
      const result = await fetchOsrmRoute(placeA.coord, placeB.coord)
      setCoords(result.coords)
      setMeta(`${result.km} km · ~${result.min} min`)
      onRoute?.({ km: result.km, min: result.min })
      mapRef.current?.fitToCoordinates(
        [placeA.coord, placeB.coord, ...result.coords],
        {
          edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
          animated: true,
        },
      )
    } catch {
      showToast({ title: 'No se pudo rutar', status: 'warning' })
    } finally {
      setBusy(false)
    }
  }, [onRoute, placeA, placeB])

  return (
    <View className="gap-3">
      <PlaceAutocomplete
        label="Punto A (origen)"
        value={queryA}
        selected={placeA}
        places={localPlaces}
        onChangeText={setQueryA}
        onSelect={setPlaceA}
      />
      <PlaceAutocomplete
        label="Punto B (destino)"
        value={queryB}
        selected={placeB}
        places={localPlaces}
        onChangeText={setQueryB}
        onSelect={setPlaceB}
      />
      <View
        className={cn(
          'overflow-hidden border border-border',
          BRAND.radius.variants.control,
        )}
        style={{ height }}
      >
        <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={initialRegion}>
          {placeA && <Marker coordinate={placeA.coord} title="A" />}
          {placeB && <Marker coordinate={placeB.coord} title="B" />}
          {coords.length > 1 && (
            <Polyline coordinates={coords} strokeWidth={4} />
          )}
        </MapView>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          label="A = mi ubicación"
          onPress={onUseMyLocation}
        />
        <Button
          size="sm"
          label={busy ? 'Calculando…' : 'Calcular mejor ruta'}
          disabled={busy || !placeA || !placeB}
          onPress={onCalculate}
        />
      </View>
      {meta && <Text className="text-sm font-medium">{meta}</Text>}
    </View>
  )
}

export type { Props as RoutePlannerProps }
/**
 *
 */
export default memo(RoutePlanner)
