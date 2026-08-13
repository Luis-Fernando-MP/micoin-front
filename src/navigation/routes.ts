export type RouteAuth = 'public' | 'private'

export type AppRoute = {
  href: string
  auth: RouteAuth
  title: string
  icon?: string
  showInNav?: boolean
}

export const routes = {
  home: {
    href: '/',
    auth: 'public',
    title: 'Home',
    icon: 'house.fill',
    showInNav: true,
  },
  login: {
    href: '/login',
    auth: 'public',
    title: 'Login',
    showInNav: false,
  },
  register: {
    href: '/register',
    auth: 'public',
    title: 'Register',
    showInNav: false,
  },
  explore: {
    href: '/explore',
    auth: 'private',
    title: 'Explore',
    icon: 'paperplane.fill',
    showInNav: true,
  },
  modal: {
    href: '/modal',
    auth: 'private',
    title: 'Modal',
    showInNav: false,
  },
} as const satisfies Record<string, AppRoute>

export type RouteKey = keyof typeof routes

export const allRoutes = Object.values(routes)

export const publicRoutes = allRoutes.filter((route) => route.auth === 'public')

export const privateRoutes = allRoutes.filter(
  (route) => route.auth === 'private',
)

const isPublicRoute = (href: string) => {
  return publicRoutes.some((route) => route.href === href)
}

const getNavRoutes = (isAuthenticated: boolean): AppRoute[] => {
  return allRoutes.filter((route) => {
    if (!route.showInNav) {
      return false
    }

    if (route.auth === 'private' && !isAuthenticated) {
      return false
    }

    return true
  })
}

export { getNavRoutes, isPublicRoute }
