import {
  AlertTriangle,
  CheckCircle,
  Circle,
  CircleAlert,
  Info,
  type LucideIcon,
  Sparkles,
  Star,
} from 'lucide-react-native'

import { THEME_VARIABLES } from '@theme/themes'

type NativeToken = keyof typeof THEME_VARIABLES

type BrandSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type BrandSizeMap<T> = Record<BrandSize, T>

const BRAND_COLORS = {
  default: {
    text: 'text-foreground',
    foreground: 'text-foreground',
    background: 'bg-card',
    border: 'border-border',
    soft: 'bg-card',
    native: 'textPrimary' as NativeToken,
    nativeBg: 'card' as NativeToken,
    icon: Circle as LucideIcon,
    label: 'Sistema',
  },
  primary: {
    text: 'text-primary',
    foreground: 'text-primary-foreground',
    background: 'bg-primary-background',
    border: 'border-primary',
    soft: 'bg-primary-background/10',
    native: 'primary' as NativeToken,
    nativeBg: 'primaryBackground' as NativeToken,
    icon: Star as LucideIcon,
    label: 'Primario',
  },
  brand: {
    text: 'text-brand',
    foreground: 'text-brand-foreground',
    background: 'bg-brand-background',
    border: 'border-brand',
    soft: 'bg-brand-background/15',
    native: 'brand' as NativeToken,
    nativeBg: 'brandBackground' as NativeToken,
    icon: Sparkles as LucideIcon,
    label: 'Marca',
  },
  warning: {
    text: 'text-warning',
    foreground: 'text-warning',
    background: 'bg-warning-bg',
    border: 'border-warning',
    soft: 'bg-warning-bg',
    native: 'semanticTextWarning' as NativeToken,
    nativeBg: 'semanticBgWarning' as NativeToken,
    icon: AlertTriangle as LucideIcon,
    label: 'Alerta',
  },
  error: {
    text: 'text-error',
    foreground: 'text-error',
    background: 'bg-error-bg',
    border: 'border-error',
    soft: 'bg-error-bg',
    native: 'semanticTextError' as NativeToken,
    nativeBg: 'semanticBgError' as NativeToken,
    icon: CircleAlert as LucideIcon,
    label: 'Error',
  },
  info: {
    text: 'text-info',
    foreground: 'text-info',
    background: 'bg-info-bg',
    border: 'border-info',
    soft: 'bg-info-bg',
    native: 'semanticTextInfo' as NativeToken,
    nativeBg: 'semanticBgInfo' as NativeToken,
    icon: Info as LucideIcon,
    label: 'Info',
  },
  success: {
    text: 'text-success',
    foreground: 'text-success',
    background: 'bg-success-bg',
    border: 'border-success',
    soft: 'bg-success-bg',
    native: 'semanticTextSuccess' as NativeToken,
    nativeBg: 'semanticBgSuccess' as NativeToken,
    icon: CheckCircle as LucideIcon,
    label: 'Éxito',
  },
} as const

const BRAND_RADIUS = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  control: 'rounded-control',
  surface: 'rounded-surface',
  pill: 'rounded-full',
} as const

const BRAND_SIZES = {
  xs: { height: 'h-8 px-2.5', text: 'text-xs', icon: 14, chip: 'px-2 py-0.5' },
  sm: { height: 'h-9 px-3', text: 'text-sm', icon: 14, chip: 'px-2.5 py-1' },
  md: { height: 'h-10 px-4', text: 'text-sm', icon: 16, chip: 'px-3 py-1.5' },
  lg: { height: 'h-12 px-5', text: 'text-base', icon: 18, chip: 'px-3.5 py-2' },
  xl: { height: 'h-14 px-6', text: 'text-lg', icon: 20, chip: 'px-4 py-2.5' },
} as const satisfies BrandSizeMap<{
  height: string
  text: string
  icon: number
  chip: string
}>

const BRAND_NATIVE = {
  background: 'background' as NativeToken,
  card: 'card' as NativeToken,
  border: 'border' as NativeToken,
  overlay: 'overlay' as NativeToken,
  textPrimary: 'textPrimary' as NativeToken,
  textSecondary: 'textSecondary' as NativeToken,
  primary: 'primary' as NativeToken,
  primaryForeground: 'primaryForeground' as NativeToken,
  brand: 'brand' as NativeToken,
  brandForeground: 'brandForeground' as NativeToken,
} as const

const BRAND_TYPE = {
  body: 'text-base',
  paragraph: 'text-base leading-relaxed',
  subtitle: 'text-sm',
  caption: 'text-xs',
  label: 'text-xs font-medium',
  highlight: 'text-base font-medium',
  title: {
    xs: 'text-sm font-semibold',
    sm: 'text-base font-semibold',
    md: 'text-lg font-semibold',
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-bold',
  } satisfies BrandSizeMap<string>,
  defaultTitleSize: 'md' as const,
  muted: 'text-secondary',
} as const

const BRAND = {
  colors: {
    variants: BRAND_COLORS,
    defaultVariant: 'default' as const,
  },
  radius: {
    variants: BRAND_RADIUS,
    defaultVariant: 'control' as const,
  },
  sizes: {
    variants: BRAND_SIZES,
    defaultVariant: 'md' as const,
  },
  type: BRAND_TYPE,
  native: BRAND_NATIVE,
} as const

type BrandStatus = keyof typeof BRAND_COLORS
type BrandRadius = keyof typeof BRAND_RADIUS
type Brand = typeof BRAND

export type {
  Brand,
  BrandRadius,
  BrandSize,
  BrandSizeMap,
  BrandStatus,
  NativeToken,
}
export { BRAND }
export default BRAND
