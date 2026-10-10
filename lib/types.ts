export type Category = {slug: string; name: string; emoji: string};
export type MarketPrice = {name: string; location?: string; price: number; min?: number; max?: number; unit?: string};
export type Product = {
 id: string | number; slug: string; name: string; emoji: string; category: string;
 unit: string; price: number; change: number; description: string;
 minimum?: number; maximum?: number; average?: number; markets: MarketPrice[];
};
export type PriceSort = 'default' | 'low' | 'high';
