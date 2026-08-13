declare module 'jsbarcode/src/barcodes' {
  type EncoderResult = { data: string; text?: string } | Array<{ data: string }>;

  type EncoderCtor = new (
    data: string,
    options: Record<string, unknown>
  ) => { encode: () => EncoderResult };

  const barcodes: Record<string, EncoderCtor>;
  export default barcodes;
}
