import { cva, type VariantProps } from 'class-variance-authority';

export type Status =
  | 'default'
  | 'primary'
  | 'brand'
  | 'warning'
  | 'error'
  | 'info'
  | 'success';

export const statusText = cva('', {
  variants: {
    status: {
      default: 'text-foreground',
      primary: 'text-primary',
      brand: 'text-brand',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
      success: 'text-success',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export const statusBg = cva('', {
  variants: {
    status: {
      default: 'bg-card',
      primary: 'bg-primary-background',
      brand: 'bg-brand-background',
      warning: 'bg-warning-bg',
      error: 'bg-error-bg',
      info: 'bg-info-bg',
      success: 'bg-success-bg',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export const statusBorder = cva('border', {
  variants: {
    status: {
      default: 'border-border',
      primary: 'border-primary',
      brand: 'border-brand',
      warning: 'border-warning',
      error: 'border-error',
      info: 'border-info',
      success: 'border-success',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export const statusSoftBg = cva('', {
  variants: {
    status: {
      default: 'bg-card',
      primary: 'bg-primary-background/10',
      brand: 'bg-brand-background/15',
      warning: 'bg-warning-bg',
      error: 'bg-error-bg',
      info: 'bg-info-bg',
      success: 'bg-success-bg',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export type StatusVariantProps = VariantProps<typeof statusText>;
