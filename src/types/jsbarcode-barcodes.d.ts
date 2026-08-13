/**
 * Declara el entry interno de jsbarcode que no exporta tipos públicos.
 * Permite importar el mapa de encoders (`CODE128`, etc.) sin `any`.
 */
declare module 'jsbarcode/src/barcodes' {
  type EncoderResult = { data: string; text?: string } | { data: string }[]

  type EncoderCtor = new (
    data: string,
    options: Record<string, unknown>,
  ) => { encode: () => EncoderResult }

  const barcodes: Record<string, EncoderCtor>
  export default barcodes
}
