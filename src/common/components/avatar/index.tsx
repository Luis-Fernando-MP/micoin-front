import { type FC, useState } from 'react'
import { View } from 'react-native'

import { Image as ExpoImage } from 'expo-image'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props {
  uri?: string
  source?: string
  fallback?: string
  size?: number
  className?: string
  status?: BrandStatus
}

/**
 * Avatar — imagen circular con fallback de iniciales.
 *
 * Resuelve mostrar identidad de usuario/comercio sin que el consumidor
 * gestione error de carga ni recorte.
 *
 * @param uri - URL de la imagen
 * @param uri.uri
 * @param source - Alias de uri (compat)
 * @param uri.source
 * @param fallback - Texto si no hay imagen. @default '?'
 * @param uri.fallback
 * @param size - Diámetro en px. @default 40
 * @param uri.size
 * @param uri.className
 * @param status - Variante semántica BRAND. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @param uri.status
 * @example
 * import Avatar from '@components/avatar';
 * <Avatar uri={user.photo} fallback="LM" size={48} status="brand" />
 */
const Avatar: FC<Props> = ({
  uri,
  source,
  fallback = '?',
  size = 40,
  className,
  status = BRAND.colors.defaultVariant,
}) => {
  const [failed, setFailed] = useState(false)
  const imageUri = uri ?? source
  const showImage = Boolean(imageUri) && !failed
  const initials = fallback.slice(0, 2).toUpperCase()

  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden border bg-card',
        BRAND.radius.variants.pill,
        BRAND.colors.variants[status].border,
        className,
      )}
      style={{ width: size, height: size }}
    >
      {showImage && (
        <ExpoImage
          source={{ uri: imageUri }}
          style={{ width: size, height: size }}
          contentFit="cover"
          onError={() => setFailed(true)}
        />
      )}
      {!showImage && <Text className="text-sm font-semibold">{initials}</Text>}
    </View>
  )
}

/**
 *
 */
export default Avatar
