export function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export function pickString(...candidates: unknown[]): string | null {
  for (const candidate of candidates) {
    if (typeof candidate === 'string') return candidate;
  }
  return null;
}

export function pickNumber(...candidates: unknown[]): number | null {
  for (const candidate of candidates) {
    if (typeof candidate === 'number' && Number.isFinite(candidate))
      return candidate;
  }
  return null;
}

export function pickBoolean(...candidates: unknown[]): boolean | null {
  for (const candidate of candidates) {
    if (typeof candidate === 'boolean') return candidate;
  }
  return null;
}
