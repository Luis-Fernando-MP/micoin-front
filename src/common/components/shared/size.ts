import { cva, type VariantProps } from 'class-variance-authority';

export type Size = 'sm' | 'md' | 'lg';

export const controlHeight = cva('', {
  variants: {
    size: {
      sm: 'h-9 px-3',
      md: 'h-10 px-4',
      lg: 'h-12 px-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const controlText = cva('font-medium', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const chipPadding = cva('items-center justify-center', {
  variants: {
    size: {
      sm: 'px-2.5 py-1',
      md: 'px-3 py-1.5',
      lg: 'px-3.5 py-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SizeVariantProps = VariantProps<typeof controlHeight>;
