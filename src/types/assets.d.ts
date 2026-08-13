/**
 * Declara los módulos de imagen para que TypeScript acepte
 * `import logo from './logo.svg'` y `require('@assets/...')`.
 * Metro los resuelve como `require()` numérico, no como componentes React.
 */
declare module '*.svg' {
  const asset: number
  export default asset
}

declare module '*.png' {
  const asset: number
  export default asset
}
