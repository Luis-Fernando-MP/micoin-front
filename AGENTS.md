# AGENTS.md

Prioridad #1 del repo: piezas reutilizables en `src/common`.

## Estilo

- Sin punto y coma. Imports: librerías arriba, alias de proyecto (`@components`, `@views`, `@core`, `@theme`, `@assets`, `@env`, `@/`) abajo, un nivel `../` si es el padre inmediato, relativos de carpeta (`./`) al final. Dos o más niveles (`../../`) → alias.
- Constantes y tipos arriba; el componente abajo. Pieza React: `export default`.
- Sin comentarios narrativos ni `//` en bloques. JSDoc en español en piezas/métodos reutilizables de `src/common` (`@param`, `@example`).
- `pnpm lint` / `pnpm lint:fix` · `pnpm format` / `pnpm format:fix`.

Alias de TypeScript:

- `@components` → `src/common/components`
- `@views` → `src/presentation`
- `@core` → `src/common/core`
- `@theme` → `src/common/utils/theme` (store, hooks, provider)
- `@assets` → `assets`
- `@device/*` → `src/common/device/*` (API nativa por carpeta)
- `@env` → `src/common/config/environment` (única lectura de `process.env`)

Tema: `BRAND_THEMES` en `src/common/utils/theme/themes.ts` (`icon` + `system`). Colores en `global.css` (clase = nombre del tema). Un tema nuevo = entrada + bloque CSS. El provider pone la clase en el padre.

## Black-box

Cada componente es una pieza de coche: se conecta y listo. El consumidor no cablea estado interno ni lógica de librería.

```
src/common/components/{name}/
  index.tsx                 # API pública mínima
  hooks/index.ts            # solo si el core lo necesita
  store/index.ts            # solo si el core lo necesita
  extensions/{domain}/
    index.tsx
    hooks/index.ts          # opcional
    store/index.ts          # opcional
```

No crear `hooks/`, `store/` ni `extensions/` vacíos.

Device nativo (`src/common/device/{name}/index.ts` o `index.tsx`; hooks en `{name}/hooks/index.ts`):

```
src/common/device/{name}/
  index.ts | index.tsx    # API pública mínima
  hooks/index.ts          # solo si el módulo lo necesita
```

- Código, nombres y variables en inglés.
- JSDoc en español en el export reutilizable de `src/common` (componente default o función pública). No en interfaces, páginas ni helpers privados.
- Screens en `presentation/` solo consumen pieces.

### Export default

```tsx
const Avatar: FC<Props> = ({ ... }) => { ... };

export type { Props as AvatarProps };
export default Avatar;
```

```tsx
import Avatar from '@components/avatar'
```

Named export solo para tipos, hooks, store, helpers y subpartes compuestas (`Dialog.Header` adjunto al default). Prohibido `export { Avatar }` como export principal.

## Contrato BRAND

Fuente de verdad: `src/common/components/shared/brand.ts`.

```ts
import BRAND, {
  type BrandRadius,
  type BrandSize,
  type BrandStatus,
} from '@components/shared/brand'

type BrandSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

`BRAND.sizes` y `BRAND.type.title` satisfacen `Record<BrandSize, …>`. Si se agrega un step, se agrega al type primero. Radius no usa esta escala (`none | sm | control | surface | pill`).

Props comunes del kit: `status?: BrandStatus`, `size?: BrandSize`, `radius?: BrandRadius`, `className?`.

Leer `BRAND.colors`, `BRAND.sizes`, `BRAND.radius`, `BRAND.type`, `BRAND.native` directo. Prohibido wrappers (`status.ts`, `size.ts`, `radius.ts`), barrels (`shared/index.ts`) y hardcodear `text-red-*`, hex de UI o `rounded-lg` arbitrario. APIs nativas (Skia, Lucide color, QR): `useMcVar(BRAND.native.brand)`, sin fallback hex. Copy de UI: `Text.Title` / `Text.Subtitle` / `Text.Caption`, no `className="text-lg font-semibold"`.

## JSDoc

```tsx
/**
 * Avatar — imagen circular con fallback de iniciales.
 *
 * Resuelve mostrar identidad sin que el consumidor gestione error de carga.
 *
 * @param uri - URL de la imagen
 * @param fallback - Texto si no hay imagen. @default '?'
 * @param size - Diámetro en px. @default 40
 * @param status - Variante semántica BRAND. @default 'default'
 *
 * @example
 * import Avatar from '@components/avatar';
 * <Avatar uri={user.photo} fallback="LM" size={48} status="brand" />
 */
```

Decoradores `@param` y `@example` obligatorios. `@default` en la descripción del param.

## Rendimiento

- Estado local mínimo; estado pesado en `hooks/` o `store/` de la pieza.
- `useCallback` al pasar handlers a listas o hijos memoizados.
- `memo` en ítems de lista y wrappers de terceros costosos.
- Sin objetos/arrays nuevos en props hot-path si el hijo está memoizado.
- Keys estables. El consumidor importa el core y usa `Charts.AreaChart`, nunca `extensions/` suelto.
- Cleanup en `useEffect` (players, timers, listeners).

## Store (Zustand)

El que necesita el dato se suscribe. El padre no lee el store para pasarlo por props.

Si el padre escucha, cualquier cambio re-renderiza al padre y a **todos** los hijos. Si solo el hijo se suscribe, solo ese hijo se actualiza.

Selector mínimo (un campo, no el state entero):

```tsx
const preference = useThemeStore((state) => state.preference)
const colorScheme = useTheme((state) => state.colorScheme)
const setPreference = useThemeStore((state) => state.setPreference)
```

Mal — destructuring todo el hook o el store:

```tsx
const { colorScheme, setPreference } = useTheme()
const Home = () => {
  const { colorScheme } = useTheme()
  return <ThemeToggle colorScheme={colorScheme} />
}
```

Bien — el hijo más bajo escucha solo:

```tsx
const ThemeToggle = () => {
  const colorScheme = useTheme((state) => state.colorScheme)
  const setPreference = useThemeStore((state) => state.setPreference)
  return …
}
```

El provider de tema sí se suscribe: aplica `dark` / StatusBar. No reparte `colorScheme` a los children.

## Ejemplo Maps

```tsx
import Maps from '@components/maps'
import Charts from '@components/charts'
import Text from '@components/text'

<Maps coordinate={sv} />
<Maps.RoutePlanner origin={a} destination={b} />
<Charts.AreaChart data={[12, 22, 31]} />
<Text.Title>Movimientos</Text.Title>
<Text.Subtitle>Hoy · 10:24</Text.Subtitle>
```

Las extensiones viven en `extensions/` y se adjuntan al default. El consumidor no las importa sueltas.

## Anti-patrones

- Un `index.tsx` de 400+ líneas con 4 modos
- Copy, toasts o deep links de producto hardcodeados en el core
- JSDoc en páginas o helpers privados
- Comentarios `//` en bloques
- Imports `../../` (dos o más niveles); un `../` al padre inmediato sí vale
- Padre que lee Zustand y lo pasa por props; el hijo que lo necesita se suscribe solo
- Carpetas `hooks/` vacías
- Clases de status/size/radius fuera de BRAND
- `renderItem` inline inestable en listas largas
- Importar `extensions/` suelto (`import AreaChart from '.../extensions/area'`)
- Barrel `shared/index.ts` o `from '@components/shared'`
- `className="text-lg font-semibold"` en copy de UI cuando existe `Text.Title`
- `export { Component }` como export principal

## Expo

SDK 54 / Expo Go. `pnpm exec expo install` para nativos. No subir de SDK si rompe Expo Go.

`EXPO_PUBLIC_APP_ENV=development` (lab / Go) vs `production` (app instalada, `.env.production`). `@device/scanner` es módulo aparte. `@device/camera` extensions: `filters` (color). VisionCamera solo en production + binario nativo.

APK de prueba (sideload, env production): `pnpm apk` → `eas build -p android --profile preview`. Instalar con `adb install` o el QR de Expo. AAB de tienda: `npx eas-cli@latest build -p android --profile production`. Mapas en APK: `GOOGLE_MAPS_API_KEY` (Maps SDK for Android) en `.env` / EAS preview.
