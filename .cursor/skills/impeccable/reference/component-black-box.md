# Component black-box (MiCoin)

Al crear, extraer o rediseñar UI reusable, aplicar este contrato. Prioridad sobre hábitos genéricos de layout.

## Pieza de coche

`src/common/components/{name}/index.tsx` es la API mínima. Más alcance = `extensions/{domain}/index.tsx`, no hinchar el core.

- `export default` el componente. Named solo para tipos, hooks y subpartes.
- JSDoc en español encima del componente (`@param`, `@example`). Código en inglés.
- Props comunes: `status`, `size`, `radius`, `className` desde `shared/brand.ts` (`BRAND`).
- No carpetas `hooks/` / `store/` vacías.
- No copy de producto, toasts ni deep links en el core.
- Extensiones se adjuntan al default: `<Charts.AreaChart />`, `<Maps.RoutePlanner />`. El consumidor no importa `extensions/` suelto.

## Rendimiento

Sin renders innecesarios: `memo` en ítems de lista, `useCallback` en handlers de listas, keys estables, cleanup en unmount.

## Import

```tsx
import Avatar from '@/common/components/avatar';
import Maps from '@/common/components/maps';
import Charts from '@/common/components/charts';
import Text from '@/common/components/text';

<Maps.RoutePlanner />
<Charts.AreaChart data={[12, 22, 31]} />
<Text.Title>Movimientos</Text.Title>
```

Ver `AGENTS.md` y `.cursor/rules/component-standards.mdc`.
