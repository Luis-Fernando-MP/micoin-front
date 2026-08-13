import * as Print from 'expo-print';

import { shareFile } from '@/common/device/sharing';
import { metadata } from '@/common/metadata';

const buildReceiptHtml = (amount: string, reference: string) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: -apple-system, sans-serif; padding: 32px; }
      h1 { font-size: 22px; margin: 0 0 8px; }
      p { margin: 4px 0; opacity: 0.7; }
      .amount { font-size: 32px; font-weight: 700; margin-top: 24px; }
    </style>
  </head>
  <body>
    <h1>${metadata.name}</h1>
    <p>Comprobante de pago</p>
    <p>Ref: ${reference}</p>
    <div class="amount">$${amount}</div>
  </body>
</html>`;
};

const printAndShareReceipt = async (
  amount = '12.50',
  reference = `MC-${Date.now().toString(36).toUpperCase()}`
) => {
  const html = buildReceiptHtml(amount, reference);
  const file = await Print.printToFileAsync({ html });
  const shared = await shareFile(file.uri, 'Comprobante PDF');
  return { ok: shared.ok, uri: file.uri, reference };
};

export { buildReceiptHtml, printAndShareReceipt };
