import { type FC, useCallback } from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { type Href, usePathname, useRouter } from 'expo-router'
import { Home, Info, Send } from 'lucide-react-native'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { useSession } from '@/auth/use-session'
import { getNavRoutes } from '@/navigation/routes'

const ICONS = {
  'house.fill': Home,
  'info.circle.fill': Info,
  'paperplane.fill': Send,
} as const

const isActiveRoute = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === '/' || pathname === '/index'
  }

  return pathname === href
}

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
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useSession()
  const tabIconSelected = useMcVar(BRAND.native.textPrimary)
  const items = getNavRoutes(isAuthenticated)

  const navigate = useCallback(
    (href: string) => {
      if (isActiveRoute(pathname, href)) {
        return
      }

      router.replace(href as Href)
    },
    [pathname, router],
  )

  return (
    <View
      className="flex-row border-t border-border bg-card"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      {items.map((route) => {
        const Icon = ICONS[route.icon as keyof typeof ICONS] ?? Home
        const active = isActiveRoute(pathname, route.href)

        return (
          <Pressable
            key={route.href}
            onPress={() => navigate(route.href)}
            className="flex-1 items-center gap-1 py-3"
          >
            <Icon color={tabIconSelected} size={22} />
            <Text
              className={
                active ? 'text-xs text-foreground' : 'text-xs text-secondary'
              }
            >
              {route.title}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default AppNav
