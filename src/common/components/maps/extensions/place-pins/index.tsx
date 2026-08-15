import { type FC, memo, useCallback, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, type Region } from 'react-native-maps'

import Button from '@components/button'
import { hasGoogleMapsKey } from '@components/maps/runtime'
import { type LatLng } from '@components/maps/types'
import MapsUnavailable from '@components/maps/unavailable'
import BRAND from '@components/shared/brand'
import { showToast } from '@components/toast'
import { getLocationSnapshot } from '@device/location'

import { cn } from '@/lib/utils'

type Pin = {
  id: string
  coordinate: LatLng
  title?: string
}

interface Props {
  pins?: Pin[]
  center?: LatLng
  height?: number
  showUser?: boolean
}

const SV: LatLng = { latitude: 13.6929, longitude: -89.2182 }

const DEFAULT_PINS: Pin[] = [
  {
    id: 'atm',
    coordinate: { latitude: 13.7009, longitude: -89.2242 },
    title: 'Punto cercano',
  },
]

/**
 * PlacePins — mapa con N marcadores alrededor de un centro.
 *
 * Extiende Maps para puntos de interés (cajeros, sucursales) y
 * recentrar en la ubicación del dispositivo.
 *
 * @param pins - Lista de marcadores
 * @param pins.pins
 * @param center - Centro inicial del mapa
 * @param pins.center
 * @param height - Alto del mapa en px. @default 180
 * @param pins.height
 * @param showUser - Muestra marcador del usuario en el centro. @default true
 *
 * @param pins.showUser
 * @example
 * import Maps from '@components/maps';
 * <Maps.PlacePins pins={atms} />
 */
const PlacePins: FC<Props> = ({
  pins = DEFAULT_PINS,
  center = SV,
  height = 180,
  showUser = true,
}) => {
  const [region, setRegion] = useState<Region>({
    ...center,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })

  const onCenterMe = useCallback(async () => {
    const snap = await getLocationSnapshot()
    if (!snap.ok) {
      showToast({ title: 'Ubicación denegada', status: 'warning' })
      return
    }
    setRegion((prev) => ({
      ...prev,
      latitude: snap.lat,
      longitude: snap.lng,
    }))
  }, [])

  if (!hasGoogleMapsKey) {
    return <MapsUnavailable height={height} />
  }

  return (
    <View className="gap-2">
      <View
        className={cn(
          'overflow-hidden border border-border',
          BRAND.radius.variants.control,
        )}
        style={{ height }}
      >
        <MapView style={{ flex: 1 }} region={region}>
          {showUser && <Marker coordinate={region} title="Tú" />}
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              coordinate={pin.coordinate}
              title={pin.title}
            />
          ))}
        </MapView>
      </View>
      <Button
        size="sm"
        variant="outline"
        label="Centrar en mí"
        onPress={onCenterMe}
      />
    </View>
  )
}

export type { Pin, Props as PlacePinsProps }
export default memo(PlacePins)
