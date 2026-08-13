# MiCoin design

Native-first. Tokens in `src/global.css` (`--mc-*`). UI in `src/common/components/{name}`. Shared: `shared/status`, `shared/size`, `shared/radius`. Product copy: `common/metadata`.

## Look

Vercel/Geist: monochrome primary, brand gold only for highlights (texto brand siempre `brand-foreground` oscuro). Motion con Reanimated (`FadeIn`).

## Radius

- `--mc-radius` / control: **16px** (`rounded-control`)
- surface: **20px** (`rounded-surface`)
- pills: `rounded-full`

## Size

`sm | md | lg` en Button, Chip, Input.

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

See `.cursor/rules/component-standards.mdc`.
