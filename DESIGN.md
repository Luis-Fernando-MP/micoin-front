# MiCoin design

Native-first. Color tokens live in `src/global.css` as `--mc-*`. Tailwind aliases in `tailwind.config.js` reuse them.

## Color tokens (`--mc-*`)

| Variable | Role |
|----------|------|
| `--mc-background` | Page background |
| `--mc-card` | Cards, secondary surfaces, outline buttons |
| `--mc-card-hover` | Hover/pressed, borders, dividers |
| `--mc-text-primary` | Main text |
| `--mc-text-secondary` | Secondary text, placeholders |
| `--mc-primary` | UI accent Vercel-style (black light / white dark) — CTAs, links, selection |
| `--mc-primary-background` | Primary button fill (same Vercel contrast pair) |
| `--mc-brand` | Gold de marca — **solo highlights especiales** |
| `--mc-brand-background` | Fondo brand — **solo superficies destacadas de marca** |
| `--mc-semantic-bg-*` / `--mc-semantic-text-*` | Warning, error, info, success |

### Primary vs brand

- **Primary**: uso cotidiano (botones default, toggle seleccionado, nav chrome).
- **Brand**: raro — logo moments, badge premium, KPI hero, etc. No pintar pantallas enteras con gold.

Nunca usar paleta Tailwind cruda (`text-red-200`, `text-black`, …).

Component conventions: `.cursor/rules/component-standards.mdc`.

## Brand logo

`BrandLogo` carga SVG de `assets/images/logo/` (`sm` / `md` / `lg`). PNG para icon/splash/favicon.

## Tailwind aliases

- `bg-background`, `text-foreground`, `text-secondary`
- `bg-card`, `bg-card-hover`, `border-card-hover`
- `bg-primary-background`, `text-primary`, `border-primary`
- `bg-brand-background`, `text-brand`, `border-brand` (uso especial)
- `text-semantic-error-text`, …

## Type / Layout / Motion

System UI. Screens in `src/presentation/{vista}`. Shared UI in `src/common`. Short functional motion.
