import { type LatLng } from '@/common/components/maps/types';

type PlaceOption = {
  id: string;
  label: string;
  subtitle?: string;
  coord: LatLng;
};

type OsrmRoute = {
  coords: LatLng[];
  km: string;
  min: number;
};

const fetchOsrmRoute = async (from: LatLng, to: LatLng): Promise<OsrmRoute> => {
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
      'User-Agent': 'MiCoin/1.0 (maps; expo-go)',
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

export type { OsrmRoute, PlaceOption };
export { fetchOsrmRoute, searchNominatim };
