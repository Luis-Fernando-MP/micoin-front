import { type FC, memo, useCallback, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { hasGoogleMapsKey } from '@components/maps/runtime'
import { type LatLng } from '@components/maps/types'
import MapsUnavailable from '@components/maps/unavailable'
import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props {
  initialPin?: LatLng
  height?: number
  onChange?: (pin: LatLng) => void
}

const SV: LatLng = { latitude: 13.6929, longitude: -89.2182 }

/**
 * DropPin — mapa donde un tap suelta un marcador.
 *
 * Extiende Maps para elegir coordenadas tocando el mapa.
 *
 * @param initialPin - Coordenada inicial del pin
 * @param initialPin.initialPin
 * @param height - Alto del mapa en px. @default 180
 * @param initialPin.height
 * @param onChange - Callback con la nueva coordenada
 *
 * @param initialPin.onChange
 * @example
 * import Maps from '@components/maps';
 * <Maps.DropPin onChange={setPin} />
 */
const DropPin: FC<Props> = ({ initialPin = SV, height = 180, onChange }) => {
  const [pin, setPin] = useState(initialPin)

  const onPress = useCallback(
    (event: { nativeEvent: { coordinate: LatLng } }) => {
      const next = event.nativeEvent.coordinate
      setPin(next)
      onChange?.(next)
    },
    [onChange],
  )

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
        <MapView
          style={{ flex: 1 }}
          initialRegion={{ ...SV, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
          onPress={onPress}
        >
          <Marker coordinate={pin} title="Pin" />
        </MapView>
      </View>
      <Text className="text-xs text-secondary">
        Lat {pin.latitude.toFixed(5)} · Lng {pin.longitude.toFixed(5)}
      </Text>
    </View>
  )
}

export type { Props as DropPinProps }
export default memo(DropPin)
