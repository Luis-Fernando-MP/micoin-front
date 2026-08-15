import { type FC } from 'react'
import { View, type ViewProps } from 'react-native'

import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props extends ViewProps {
  height?: number
  className?: string
}

/**
 * MapsUnavailable — placeholder cuando falta la API key de Google Maps.
 *
 * Evita montar MapView en APK sin `GOOGLE_MAPS_API_KEY`.
 *
 * @param height - Alto del contenedor. @default 180
 * @param className - Clases NativeWind extra
 *
 * @example
 * import MapsUnavailable from '@components/maps/unavailable'
 * <MapsUnavailable height={200} />
 */
const MapsUnavailable: FC<Props> = ({
  height = 180,
  className,
  ...props
}) => {
  return (
    <View
      className={cn(
        'items-center justify-center border border-border bg-muted px-4',
        BRAND.radius.variants.control,
        className,
      )}
      style={{ height }}
      {...props}
    >
      <Text.Caption className="text-center">
        Mapas requieren GOOGLE_MAPS_API_KEY en el build del APK.
      </Text.Caption>
    </View>
  )
}

export default MapsUnavailable
