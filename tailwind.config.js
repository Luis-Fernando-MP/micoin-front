/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: 'var(--mc-radius)',
        control: 'var(--mc-radius-control)',
        surface: 'var(--mc-radius-surface)',
      },
      colors: {
        background: 'var(--mc-background)',
        foreground: 'var(--mc-text-primary)',
        secondary: 'var(--mc-text-secondary)',
        border: 'var(--mc-border)',
        overlay: 'var(--mc-overlay)',
        card: {
          DEFAULT: 'var(--mc-card)',
          hover: 'var(--mc-card-hover)',
        },
        primary: {
          DEFAULT: 'var(--mc-primary)',
          background: 'var(--mc-primary-background)',
          foreground: 'var(--mc-primary-foreground)',
        },
        brand: {
          DEFAULT: 'var(--mc-brand)',
          background: 'var(--mc-brand-background)',
          foreground: 'var(--mc-brand-foreground)',
        },
        warning: {
          DEFAULT: 'var(--mc-semantic-text-warning)',
          bg: 'var(--mc-semantic-bg-warning)',
        },
        error: {
          DEFAULT: 'var(--mc-semantic-text-error)',
          bg: 'var(--mc-semantic-bg-error)',
        },
        info: {
          DEFAULT: 'var(--mc-semantic-text-info)',
          bg: 'var(--mc-semantic-bg-info)',
        },
        success: {
          DEFAULT: 'var(--mc-semantic-text-success)',
          bg: 'var(--mc-semantic-bg-success)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
