import * as Location from 'expo-location';

const getLocationSnapshot = async () => {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) {
    return { ok: false as const, reason: 'denied' as const };
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    ok: true as const,
    lat: Number(position.coords.latitude.toFixed(4)),
    lng: Number(position.coords.longitude.toFixed(4)),
    accuracy: Math.round(position.coords.accuracy ?? 0),
  };
};

export { getLocationSnapshot };
