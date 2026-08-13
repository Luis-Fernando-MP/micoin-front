import { type FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { type Href, Link } from 'expo-router'
import { Home, Send } from 'lucide-react-native'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { useSession } from '@/auth/use-session'
import { cn } from '@/lib/utils'
import { getNavRoutes } from '@/navigation/routes'

const ICONS = {
  'house.fill': Home,
  'paperplane.fill': Send,
} as const

/**
 * AppNav — barra de navegación inferior del kit MiCoin.
 *
 * @param props - Sin props; lee sesión y rutas internamente
 *
 * @example
 * import AppNav from '@components/nav'
 * <AppNav />
 */
const AppNav: FC = () => {
  const insets = useSafeAreaInsets()
  const { isAuthenticated } = useSession()
  const tabIconSelected = useMcVar(BRAND.native.textPrimary)
  const items = getNavRoutes(isAuthenticated)

  return (
    <View
      className="flex-row border-t border-border bg-card"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      {items.map((route) => {
        const Icon = ICONS[route.icon as keyof typeof ICONS] ?? Home

        return (
          <Link key={route.href} href={route.href as Href} asChild>
            <View className={cn('flex-1 items-center gap-1 py-3')}>
              <Icon color={tabIconSelected} size={22} />
              <Text className="text-xs text-foreground">{route.title}</Text>
            </View>
          </Link>
        )
      })}
    </View>
  )
}

export { useNavTheme } from './theme'
/**
 *
 */
export default AppNav
