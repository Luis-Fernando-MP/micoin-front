import { type FC, type ReactNode } from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'

import BRAND from '@/common/components/shared/brand'
import Text from '@/common/components/text'
import { cn } from '@/lib/utils'
import { useMcVar } from '@/theme/hooks/use-theme-var'

interface Props {
  title: string
  showBackButton?: boolean
  rightComponents?: ReactNode[]
  className?: string
}

/**
 * Header — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver HeaderProps / Props del archivo
 *
 * @param props.title
 * @param props.showBackButton
 * @param props.rightComponents
 * @param props.className
 * @example
 * import Header from '@/common/components/header';
 * <Header />
 */
const Header: FC<Props> = ({
  title,
  showBackButton = false,
  rightComponents = [],
  className,
}) => {
  const insets = useSafeAreaInsets()
  const iconColor = useMcVar(BRAND.native.textPrimary)
  const hasRight = rightComponents.length > 0

  return (
    <View
      style={{ paddingTop: insets.top }}
      className={cn(
        'w-full flex-row items-center justify-between bg-background px-5 pb-2',
        className,
      )}
    >
      <View className="min-w-0 flex-1 flex-row items-center">
        {showBackButton && (
          <Pressable onPress={() => router.back()} className="mr-3 py-3">
            <ArrowLeft size={22} color={iconColor} />
          </Pressable>
        )}
        <Text.Title className="py-3" numberOfLines={1}>
          {title}
        </Text.Title>
      </View>
      {hasRight && (
        <View className="flex-row items-center justify-end gap-4">
          {rightComponents.map((component, index) => (
            <View key={index}>{component}</View>
          ))}
        </View>
      )}
    </View>
  )
}

/**
 *
 */
export default Header
