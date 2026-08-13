import {
  Flower2,
  type LucideIcon,
  Moon,
  Square,
  Sun,
} from 'lucide-react-native'

enum ThemeSystem {
  Light = 'light',
  Dark = 'dark',
}

const SYSTEM_PREFERENCE = 'system' as const

type ThemeEntry = {
  label: string
  icon: LucideIcon
  system: ThemeSystem | null
}

/**
 * THEME_VARIABLES — nombres de las CSS variables `--mc-*`.
 *
 * Los valores viven en `global.css`. `useMcVar` y `BRAND.native` leen estas claves.
 *
 * @example
 * import { THEME_VARIABLES } from '@theme/themes'
 * THEME_VARIABLES.brand
 */
const THEME_VARIABLES = {
  background: '--mc-background',
  card: '--mc-card',
  cardHover: '--mc-card-hover',
  border: '--mc-border',
  overlay: '--mc-overlay',
  semanticBgWarning: '--mc-semantic-bg-warning',
  semanticTextWarning: '--mc-semantic-text-warning',
  semanticBgError: '--mc-semantic-bg-error',
  semanticTextError: '--mc-semantic-text-error',
  semanticBgInfo: '--mc-semantic-bg-info',
  semanticTextInfo: '--mc-semantic-text-info',
  semanticBgSuccess: '--mc-semantic-bg-success',
  semanticTextSuccess: '--mc-semantic-text-success',
  textPrimary: '--mc-text-primary',
  textSecondary: '--mc-text-secondary',
  primary: '--mc-primary',
  primaryBackground: '--mc-primary-background',
  primaryForeground: '--mc-primary-foreground',
  brand: '--mc-brand',
  brandBackground: '--mc-brand-background',
  brandForeground: '--mc-brand-foreground',
} as const

/**
 * BRAND_THEMES — catálogo de apariencias.
 *
 * Colores en `global.css` (clase = clave). Aquí label, icono y chrome de sistema.
 * Un tema nuevo: entrada + bloque CSS con el mismo nombre.
 *
 * @example
 * BRAND_THEMES.gray.label
 */
const BRAND_THEMES = {
  light: {
    label: 'Claro',
    icon: Sun,
    system: ThemeSystem.Light,
  },
  pink: {
    label: 'Rosa pastel',
    icon: Flower2,
    system: ThemeSystem.Light,
  },
  gray: {
    label: 'Gris',
    icon: Square,
    system: null,
  },
  dark: {
    label: 'Oscuro',
    icon: Moon,
    system: ThemeSystem.Dark,
  },
} as const satisfies Record<string, ThemeEntry>

type ThemeAppearance = keyof typeof BRAND_THEMES
type ThemePreference = ThemeAppearance | typeof SYSTEM_PREFERENCE
type ThemeVariable = keyof typeof THEME_VARIABLES

export { BRAND_THEMES, SYSTEM_PREFERENCE, THEME_VARIABLES, ThemeSystem }
export type { ThemeAppearance, ThemeEntry, ThemePreference, ThemeVariable }
