import type { PriceSort, Product } from './types';
const banglaDigits = '০১২৩৪৫৬৭৮৯';
export function numericValue(value: unknown): number {
 if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
 if (value === null || value === undefined) return 0;
 const original = String(value);
 const text = original
   .replace(/[০-৯]/g, char => String(banglaDigits.indexOf(char)))
   .replace(/[−–]/g,'-').replace(/,/g,'')
   .replace(/[^\d.+-]/g,'');
 const num = parseFloat(text);
 return Number.isFinite(num) ? (/▼|decrease|down/i.test(original) ? -Math.abs(num) : num) : 0;
}
export function bnNumber(value: number, fractionDigits = 0) {
 return new Intl.NumberFormat('bn-BD', {
  minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits
 }).format(value);
}
export function sortProducts<T extends Pick<Product,'price'>>(products: readonly T[], sort: PriceSort): T[] {
 const result = [...products];
 if (sort === 'low') result.sort((a,b) => numericValue(a.price) - numericValue(b.price));
 if (sort === 'high') result.sort((a,b) => numericValue(b.price) - numericValue(a.price));
 return result;
}
export function marketStats(prices: number[]): {min: number; max: number; avg: number} | null {
 if (!prices.length) return null;
 return {min: Math.min(...prices), max: Math.max(...prices), avg: prices.reduce((a,b)=>a+b,0)/prices.length};
}


/** Read the assignment API's `{dir, pct}` change shape as well as legacy values. */
export function priceChange(
 value: unknown,
 options: {direction?: unknown; today?: unknown; yesterday?: unknown; fallback?: number} = {}
): number {
 const change = value && typeof value === 'object' && !Array.isArray(value)
  ? value as Record<string, unknown> : null;
 const pct = change
  ? change.pct ?? change.percent ?? change.percentage ?? change.value
  : value;
 const direction = String(
  change?.dir ?? change?.direction ?? change?.trend ?? options.direction ?? ''
 ).toLowerCase();
 if (/^(flat|unchanged|same|stable|none)$|সমান|অপরিবর্তিত/.test(direction)) return 0;
 if (pct !== undefined && pct !== null && pct !== '') {
  const amount = numericValue(pct);
  if (/down|decreas|fall|drop|কম|▼/.test(direction)) return -Math.abs(amount);
  if (/up|increas|ris|বাড়|বেড়|▲/.test(direction)) return Math.abs(amount);
  return amount;
 }
 if (options.today !== undefined && options.yesterday !== undefined) {
  const previous = numericValue(options.yesterday);
  if (previous > 0) {
   const percent = (numericValue(options.today) - previous) * 100 / previous;
   return Math.round(percent * 10) / 10;
  }
 }
 return options.fallback ?? 0;
}


/** Price summary from markets with their own min/max bands. */
export function marketRangeStats(
 markets: ReadonlyArray<{ price: number; min?: number; max?: number }>
): {min: number; max: number; avg: number} | null {
 if (!markets.length) return null;
 const lows = markets.map(m => m.min ?? m.price);
 const highs = markets.map(m => m.max ?? m.price);
 return {
  min: Math.min(...lows),
  max: Math.max(...highs),
  avg: markets.reduce((sum,m) => sum + (m.min !== undefined && m.max !== undefined
   ? (m.min + m.max) / 2 : m.price),0) / markets.length
 };
}
