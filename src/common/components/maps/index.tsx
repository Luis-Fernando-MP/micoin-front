import { type FC, memo } from 'react'
import { View, type ViewProps } from 'react-native'
import MapView, { Marker, type Region } from 'react-native-maps'

import DropPin from '@components/maps/extensions/drop-pin'
import PlacePins from '@components/maps/extensions/place-pins'
import RoutePlanner from '@components/maps/extensions/route-planner'
import { hasGoogleMapsKey } from '@components/maps/runtime'
import { type LatLng } from '@components/maps/types'
import MapsUnavailable from '@components/maps/unavailable'
import BRAND from '@components/shared/brand'

import { cn } from '@/lib/utils'

interface Props extends Omit<ViewProps, 'children'> {
  coordinate: LatLng
  height?: number
  title?: string
  latitudeDelta?: number
  longitudeDelta?: number
  className?: string
}

/**
 * Maps — mapa nativo con un solo punto.
 *
 * Resuelve mostrar una ubicación sin que el consumidor gestione región,
 * marcador ni contenedor recortado. Extensiones: `Maps.RoutePlanner`,
 * `Maps.PlacePins`, `Maps.DropPin`.
 *
 * @param coordinate - Latitud y longitud del punto
 * @param coordinate.coordinate
 * @param height - Alto del mapa en px. @default 180
 * @param coordinate.height
 * @param title - Título del marcador
 * @param coordinate.title
 * @param latitudeDelta - Zoom vertical. @default 0.08
 * @param coordinate.latitudeDelta
 * @param longitudeDelta - Zoom horizontal. @default 0.08
 * @param coordinate.longitudeDelta
 * @param className - Clases NativeWind extra
 *
 * @param coordinate.className
 * @example
 * import Maps from '@components/maps';
 * <Maps coordinate={{ latitude: 13.69, longitude: -89.22 }} title="SV" />
 * <Maps.RoutePlanner />
 */
const MapsRoot: FC<Props> = ({
  coordinate,
  height = 180,
  title,
  latitudeDelta = 0.08,
  longitudeDelta = 0.08,
  className,
  ...props
}) => {
  if (!hasGoogleMapsKey) {
    return <MapsUnavailable height={height} className={className} {...props} />
  }

  const region: Region = {
    ...coordinate,
    latitudeDelta,
    longitudeDelta,
  }

  return (
    <View
      className={cn(
        'overflow-hidden border border-border',
        BRAND.radius.variants.control,
        className,
      )}
      style={{ height }}
      {...props}
    >
      <MapView style={{ flex: 1 }} initialRegion={region}>
        <Marker coordinate={coordinate} title={title} />
      </MapView>
    </View>
  )
}

const Maps = Object.assign(memo(MapsRoot), {
  RoutePlanner,
  PlacePins,
  DropPin,
})

export type { LatLng } from '@components/maps/types'
export type { Props as MapsProps }
export default Maps
