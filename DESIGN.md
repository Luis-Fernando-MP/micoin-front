# MiCoin design

Native-first. Tokens in `src/global.css` (`--mc-*`). UI in `src/common/components/{name}` (black-box, `export default`). Shared contract: `shared/brand.ts` only (`BRAND` colors/radius/sizes/type/native). No wrappers, no barrel `shared/index.ts`. Product copy: `common/metadata`. See `AGENTS.md`.

## Look

Vercel/Geist: monochrome primary, brand gold only for highlights (texto brand siempre `brand-foreground` oscuro). Temas: `BRAND_THEMES` + clases en `global.css`. Motion con Reanimated (`FadeIn`).

## Radius

- `--mc-radius` / control: **16px** (`rounded-control`)
- surface: **20px** (`rounded-surface`)
- pills: `rounded-full`

## Type

Copy de UI vía `Text` + extensiones. Escala en `BRAND.type` (size/weight/leading; el color va por `status` o `BRAND.type.muted`).

- `Text` — body
- `Text.Title` — encabezado (`size` xs–xl)
- `Text.Subtitle` — apoyo muted
- `Text.Paragraph` — bloque de lectura
- `Text.Caption` — meta / helper
- `Text.Label` — etiqueta de campo o sección
- `Text.Highlight` — énfasis (no es una caja)

Controles (Button, Chip, Input nativo, Badge, Avatar) siguen con su tipografía propia.

## Size

`BrandSize` = `xs | sm | md | lg | xl`. `BRAND.sizes` y `BRAND.type.title` cubren las cinco. Button, Chip, Input, Text.Title, BrandLogo.

## Status

`default | primary | brand | warning | error | info | success`

## Stack

Expo SDK **54** / Expo Go. `expo-camera` para captura con filtros ligeros.

## Structure

- `common/components/*` — UI kit
- `common/device/*` — biometrics, files, camera
- `common/metadata` — nombre, tagline, prompts
- `common/core/*` — HTTP / GraphQL / React Query
- `presentation/*` — screens

## Conventions

See `AGENTS.md` and `.cursor/rules/component-standards.mdc`.
