/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        /* Layout & surfaces — aliases over --mc-* */
        background: 'var(--mc-background)',
        foreground: 'var(--mc-text-primary)',
        secondary: 'var(--mc-text-secondary)',
        card: {
          DEFAULT: 'var(--mc-card)',
          hover: 'var(--mc-card-hover)',
        },
        primary: {
          DEFAULT: 'var(--mc-primary)',
          background: 'var(--mc-primary-background)',
        },
        brand: {
          DEFAULT: 'var(--mc-brand)',
          background: 'var(--mc-brand-background)',
        },
        /* Semantic states */
        'semantic-warning-bg': 'var(--mc-semantic-bg-warning)',
        'semantic-warning-text': 'var(--mc-semantic-text-warning)',
        'semantic-error-bg': 'var(--mc-semantic-bg-error)',
        'semantic-error-text': 'var(--mc-semantic-text-error)',
        'semantic-info-bg': 'var(--mc-semantic-bg-info)',
        'semantic-info-text': 'var(--mc-semantic-text-info)',
        'semantic-success-bg': 'var(--mc-semantic-bg-success)',
        'semantic-success-text': 'var(--mc-semantic-text-success)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
