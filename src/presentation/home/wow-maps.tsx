import { type FC, type ReactNode, useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import MapView, { Marker, Polyline, type Region } from 'react-native-maps';

import { Button } from '@/common/components/button';
import { Input } from '@/common/components/input';
import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { showToast } from '@/common/components/toast';
import { getLocationSnapshot } from '@/common/device/location';
import { cn } from '@/lib/utils';

type LatLng = { latitude: number; longitude: number };

type PlaceOption = {
  id: string;
  label: string;
  subtitle?: string;
  coord: LatLng;
};

const SV: LatLng = { latitude: 13.6929, longitude: -89.2182 };

const LOCAL_PLACES: PlaceOption[] = [
  {
    id: 'local-sv',
    label: 'San Salvador centro',
    subtitle: 'El Salvador',
    coord: SV,
  },
  {
    id: 'local-airport',
    label: 'Aeropuerto Internacional',
    subtitle: 'El Salvador',
    coord: { latitude: 13.4409, longitude: -89.0557 },
  },
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
];

const DemoLabel: FC<{ label: string }> = ({ label }) => (
  <Text className="mb-1 text-xs font-medium text-secondary">{label}</Text>
);

const MapBox: FC<{ children: ReactNode; height?: number }> = ({
  children,
  height = 180,
}) => (
  <View
    className={cn('overflow-hidden border border-border', radius.control)}
    style={{ height }}
  >
    {children}
  </View>
);

const fetchOsrmRoute = async (from: LatLng, to: LatLng) => {
  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${from.longitude},${from.latitude};${to.longitude},${to.latitude}` +
    `?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const json = (await res.json()) as {
    code?: string;
    routes?: {
      distance: number;
      duration: number;
      geometry: { coordinates: [number, number][] };
    }[];
  };
  if (json.code !== 'Ok' || !json.routes?.[0]) {
    throw new Error(json.code ?? 'sin-ruta');
  }
  const route = json.routes[0];
  return {
    coords: route.geometry.coordinates.map(([lng, lat]) => ({
      latitude: lat,
      longitude: lng,
    })),
    km: (route.distance / 1000).toFixed(1),
    min: Math.round(route.duration / 60),
  };
};

const searchNominatim = async (query: string): Promise<PlaceOption[]> => {
  const url =
    `https://nominatim.openstreetmap.org/search?format=json&limit=6&addressdetails=1&q=` +
    encodeURIComponent(query);
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'MiCoin/1.0 (wow-lab; expo-go)',
    },
  });
  if (!res.ok) {
    return [];
  }
  const json = (await res.json()) as {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
  }[];
  return json.map((item) => ({
    id: `osm-${item.place_id}`,
    label: item.display_name.split(',')[0] ?? item.display_name,
    subtitle: item.display_name,
    coord: {
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    },
  }));
};

const PlaceAutocomplete: FC<{
  label: string;
  value: string;
  selected?: PlaceOption | null;
  onChangeText: (text: string) => void;
  onSelect: (place: PlaceOption) => void;
}> = ({ label, value, selected, onChangeText, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const q = value.trim();
    if (q.length < 2) {
      setOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(() => {
      void (async () => {
        const local = LOCAL_PLACES.filter((place) =>
          `${place.label} ${place.subtitle}`.toLowerCase().includes(q.toLowerCase())
        );
        let remote: PlaceOption[] = [];
        try {
          remote = await searchNominatim(`${q}, El Salvador`);
        } catch {
          remote = [];
        }
        const merged = [...local, ...remote].filter(
          (place, index, arr) =>
            arr.findIndex((item) => item.id === place.id) === index
        );
        setOptions(merged.slice(0, 8));
        setLoading(false);
      })();
    }, 350);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value]);

  return (
    <View className="gap-1.5">
      <Text className="text-xs font-medium text-secondary">{label}</Text>
      <Input
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          setOpen(true);
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
            radius.control
          )}
        >
          {loading && (
            <Text className="px-3 py-2 text-xs text-secondary">Buscando…</Text>
          )}
          {!loading && !options.length && (
            <Text className="px-3 py-2 text-xs text-secondary">
              Sin resultados. Prueba “Multiplaza” o “Aeropuerto”.
            </Text>
          )}
          {options.map((place) => (
            <Pressable
              key={place.id}
              className="border-b border-border px-3 py-2"
              onPress={() => {
                onSelect(place);
                onChangeText(place.label);
                setOpen(false);
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
  );
};

const AbRouteMap: FC = () => {
  const mapRef = useRef<MapView>(null);
  const [queryA, setQueryA] = useState('San Salvador centro');
  const [queryB, setQueryB] = useState('Aeropuerto Internacional');
  const [placeA, setPlaceA] = useState<PlaceOption | null>(LOCAL_PLACES[0]);
  const [placeB, setPlaceB] = useState<PlaceOption | null>(LOCAL_PLACES[1]);
  const [coords, setCoords] = useState<LatLng[]>([]);
  const [meta, setMeta] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <View className="gap-3">
      <DemoLabel label="Ruta A → B con autocompletado" />
      <Text className="text-xs text-secondary">
        Escribe en A o B: aparecen sugerencias locales + OpenStreetMap. Elige
        una opción y calcula la mejor ruta.
      </Text>
      <PlaceAutocomplete
        label="Punto A (origen)"
        value={queryA}
        selected={placeA}
        onChangeText={setQueryA}
        onSelect={setPlaceA}
      />
      <PlaceAutocomplete
        label="Punto B (destino)"
        value={queryB}
        selected={placeB}
        onChangeText={setQueryB}
        onSelect={setPlaceB}
      />
      <MapBox height={220}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            ...SV,
            latitudeDelta: 0.35,
            longitudeDelta: 0.35,
          }}
        >
          {placeA && (
            <Marker coordinate={placeA.coord} title="A" pinColor="#171717" />
          )}
          {placeB && (
            <Marker coordinate={placeB.coord} title="B" pinColor="#ca9138" />
          )}
          {coords.length > 1 && (
            <Polyline
              coordinates={coords}
              strokeColor="#ca9138"
              strokeWidth={4}
            />
          )}
        </MapView>
      </MapBox>
      <View className="flex-row flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          label="A = mi ubicación"
          onPress={async () => {
            const snap = await getLocationSnapshot();
            if (!snap.ok) {
              showToast({ title: 'Ubicación denegada', status: 'warning' });
              return;
            }
            const mine: PlaceOption = {
              id: 'me',
              label: 'Mi ubicación',
              subtitle: `${snap.lat}, ${snap.lng}`,
              coord: { latitude: snap.lat, longitude: snap.lng },
            };
            setPlaceA(mine);
            setQueryA(mine.label);
          }}
        />
        <Button
          size="sm"
          label={busy ? 'Calculando…' : 'Calcular mejor ruta'}
          disabled={busy || !placeA || !placeB}
          onPress={async () => {
            if (!placeA || !placeB) {
              return;
            }
            setBusy(true);
            try {
              const result = await fetchOsrmRoute(placeA.coord, placeB.coord);
              setCoords(result.coords);
              setMeta(`${result.km} km · ~${result.min} min`);
              mapRef.current?.fitToCoordinates(
                [placeA.coord, placeB.coord, ...result.coords],
                {
                  edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
                  animated: true,
                }
              );
              showToast({
                title: 'Ruta lista',
                message: `${result.km} km`,
                status: 'success',
              });
            } catch {
              showToast({ title: 'No se pudo rutar', status: 'warning' });
            } finally {
              setBusy(false);
            }
          }}
        />
      </View>
      {meta && <Text className="text-sm font-medium">{meta}</Text>}
    </View>
  );
};

const AtmMap: FC = () => {
  const [region, setRegion] = useState<Region>({
    ...SV,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  return (
    <View className="gap-2">
      <DemoLabel label="Extra · cajeros cerca" />
      <MapBox>
        <MapView style={{ flex: 1 }} region={region}>
          <Marker coordinate={region} title="Tú" />
          <Marker
            coordinate={{
              latitude: region.latitude + 0.008,
              longitude: region.longitude + 0.006,
            }}
            title="Cajero MiCoin"
            pinColor="#ca9138"
          />
        </MapView>
      </MapBox>
      <Button
        size="sm"
        variant="outline"
        label="Centrar en mí"
        onPress={async () => {
          const snap = await getLocationSnapshot();
          if (!snap.ok) {
            showToast({ title: 'Ubicación denegada', status: 'warning' });
            return;
          }
          setRegion((prev) => ({
            ...prev,
            latitude: snap.lat,
            longitude: snap.lng,
          }));
        }}
      />
    </View>
  );
};

const DropPinMap: FC = () => {
  const [pin, setPin] = useState(SV);
  return (
    <View className="gap-2">
      <DemoLabel label="Extra · toca el mapa para soltar un pin" />
      <MapBox>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{ ...SV, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
          onPress={(event) => setPin(event.nativeEvent.coordinate)}
        >
          <Marker coordinate={pin} title="Pin" pinColor="#ca9138" />
        </MapView>
      </MapBox>
      <Text className="text-xs text-secondary">
        Lat {pin.latitude.toFixed(5)} · Lng {pin.longitude.toFixed(5)}
      </Text>
    </View>
  );
};

const MapsGallery: FC = () => {
  return (
    <View className="gap-6">
      <AbRouteMap />
      <AtmMap />
      <DropPinMap />
    </View>
  );
};

export { MapsGallery };
