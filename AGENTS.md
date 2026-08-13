# AGENTS.md

Prioridad #1 del repo: piezas reutilizables en `src/common`.

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

- Código, nombres y variables en inglés.
- JSDoc en español, solo encima del componente exportado (no en interfaces, no en páginas, no en métodos internos).
- Screens en `presentation/` solo consumen pieces.

### Export default

```tsx
const Avatar: FC<Props> = ({ ... }) => { ... };

export type { Props as AvatarProps };
export default Avatar;
```

```tsx
import Avatar from '@/common/components/avatar';
```

Named export solo para tipos, hooks, store, helpers y subpartes compuestas (`Dialog.Header` adjunto al default). Prohibido `export { Avatar }` como export principal.

## Contrato BRAND

Fuente de verdad: `src/common/components/shared/brand.ts`.

```ts
import BRAND, { type BrandStatus, type BrandSize, type BrandRadius } from '@/common/components/shared/brand';
```

Props comunes del kit: `status?: BrandStatus`, `size?: BrandSize`, `radius?: BrandRadius`, `className?`.

Leer `BRAND.colors`, `BRAND.sizes`, `BRAND.radius`, `BRAND.native` directo. Prohibido wrappers (`status.ts`, `size.ts`, `radius.ts`) y hardcodear `text-red-*`, hex de UI o `rounded-lg` arbitrario. APIs nativas (Skia, Lucide color, QR): `useMcVar(BRAND.native.brand)`, sin fallback hex.

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
 * import Avatar from '@/common/components/avatar';
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

## Ejemplo Maps

```tsx
import Maps from '@/common/components/maps';
import Charts from '@/common/components/charts';

<Maps coordinate={sv} />
<Maps.RoutePlanner origin={a} destination={b} />
<Charts.AreaChart data={[12, 22, 31]} />
```

Las extensiones viven en `extensions/` y se adjuntan al default. El consumidor no las importa sueltas.

## Anti-patrones

- Un `index.tsx` de 400+ líneas con 4 modos
- Copy, toasts o deep links de producto hardcodeados en el core
- JSDoc en páginas o helpers privados
- Carpetas `hooks/` vacías
- Clases de status/size/radius fuera de BRAND
- `renderItem` inline inestable en listas largas
- Importar `extensions/` suelto (`import AreaChart from '.../extensions/area'`)
- `export { Component }` como export principal

## Expo

SDK 54 / Expo Go. `pnpm exec expo install` para nativos. No subir de SDK si rompe Expo Go.

Próximo candidato a extraer con el mismo patrón: `src/common/device/camera.tsx` → `components/camera` + extensions `scanner` / `filters`.
