# MiCoin design

Native-first. Tokens in `src/global.css` (`--mc-*`). UI in `src/common/components/{name}` (black-box, `export default`). Shared contract: `shared/brand.ts` only (`BRAND` colors/radius/sizes/native). No wrappers. Product copy: `common/metadata`. See `AGENTS.md`.

## Look

Vercel/Geist: monochrome primary, brand gold only for highlights (texto brand siempre `brand-foreground` oscuro). Motion con Reanimated (`FadeIn`).

## Radius

- `--mc-radius` / control: **16px** (`rounded-control`)
- surface: **20px** (`rounded-surface`)
- pills: `rounded-full`

## Size

`xs | sm | md | lg` vía `BRAND.sizes` en Button, Chip, Input.

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
