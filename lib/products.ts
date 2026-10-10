import 'server-only';
import { categories as knownCategories, snapshotProducts } from '../data/snapshot';
import type { Category, Product, MarketPrice } from './types';
import { numericValue, priceChange } from './numbers';


const API_BASES = [
 'https://api.api-store.workers.dev/api/bazardor',
 'https://api.abcz.workers.dev/api/bazardor'
];
type Obj = Record<string,unknown>;
function record(value: unknown): Obj { return value && typeof value === 'object' && !Array.isArray(value) ? value as Obj : {}; }
function pick(o: Obj, keys: string[]) { for (const key of keys) if (o[key] !== undefined && o[key] !== null && o[key] !== '') return o[key]; }
function str(value: unknown): string { return typeof value === 'string' ? value : typeof value === 'number' ? String(value) : ''; }
function list(value: unknown, keys: string[]): unknown[] {
 if (Array.isArray(value)) return value;
 const obj = record(value);
 for (const key of keys) {const inner = obj[key]; if (Array.isArray(inner)) return inner; const sub=record(inner); for(const nested of keys) if(Array.isArray(sub[nested])) return sub[nested] as unknown[];}
 return [];
}
function categorySlug(v: unknown) {
 const raw = record(v); const value = str(pick(raw,['slug','id','name']) ?? v).toLowerCase();
 const aliases: Record<string,string> = {'চাল':'chal','ডাল':'dal','তেল':'tel','সবজি':'sobji','মাছ':'mach','মাংস':'mangsho','ডিম-দুধ':'dim-dui','মসলা':'mosla','dim-dudh':'dim-dui'};
 return aliases[value] ?? value;
}
function fallbackSlug(name: string, index: number) {
 return snapshotProducts.find(p=>p.name===name)?.slug ?? `product-${index+1}`;
}
function normalizeMarket(v: unknown): MarketPrice | null {
 const m=record(v);
 const rawName=pick(m,['marketName','market_name','bazar','bazarName','bazar_name','market','name']);
 const name=typeof rawName==='object' ? str(pick(record(rawName),['name','name_bn','title'])) : str(rawName);
 const minRaw=pick(m,['min','minPrice','min_price','minimum','minimumPrice']);
 const maxRaw=pick(m,['max','maxPrice','max_price','maximum','maximumPrice']);
 const priceRaw=pick(m,['price','todayPrice','today_price','currentPrice','current_price','amount']);
 if (!name || (priceRaw===undefined && minRaw===undefined && maxRaw===undefined)) return null;
 const min=minRaw===undefined?undefined:numericValue(minRaw);
 const max=maxRaw===undefined?undefined:numericValue(maxRaw);
 // The supplied BazarDor API exposes a [min,max] range for each market, not a single price.
 // Use the midpoint for compatibility and retain the actual bounds for displaying both.
 const price=priceRaw===undefined ? ((min??max??0)+(max??min??0))/2 : numericValue(priceRaw);
 return {
  name, price, min, max,
  location:str(pick(m,['division','location','address','district','area'])) || undefined,
  unit:str(pick(m,['unit'])) || undefined
 };
}
function normalizeProduct(item: unknown, index: number): Product | null {
 const p=record(item), category=categorySlug(pick(p,['categorySlug','category_slug','category','categoryId','category_id','type']));
 const name=str(pick(p,['nameBn','name_bn','name_bangla','name','title','productName','product_name']));
 if(!name) return null;
 const fallback=snapshotProducts.find(s=>s.name===name || s.slug===p.slug || String(s.id)===String(p.id));
 const slug=str(pick(p,['slug','productSlug','product_slug'])) || fallbackSlug(name,index);
 const rawMarkets=pick(p,['markets','marketPrices','market_prices','bazarPrices','bazar_prices','market_data','marketData','bazaars']);
 let marketItems=list(rawMarkets,['data','items','markets','prices']);
 if(!marketItems.length && rawMarkets && typeof rawMarkets==='object' && !Array.isArray(rawMarkets)) {
  marketItems=Object.entries(record(rawMarkets)).map(([name,value])=>typeof value==='object'?{name,...record(value)}:{name,price:value});
 }
 const markets=marketItems.map(normalizeMarket).filter((v):v is MarketPrice=>Boolean(v));
 const priceRaw=pick(p,['today','todayPrice','today_price','currentPrice','current_price','price','averagePrice','average_price','avgPrice','avg_price']);
 const price=priceRaw===undefined ? fallback?.price ?? 0 : numericValue(priceRaw);
 const changeRaw=pick(p,['change','changePercent','change_percent','percentageChange','percentage_change','priceChange','price_change','change_percentage']);
 const change=priceChange(changeRaw,{
  direction:pick(p,['trend','direction','changeType','change_type']),
  today: priceRaw, yesterday:pick(p,['yesterday','yesterdayPrice','yesterday_price']),
  fallback:fallback?.change ?? 0
 });
 const rawUnit=str(pick(p,['unit','unitName','unit_name','measurement']));
 const unit=(rawUnit || fallback?.unit || 'কেজি').replace(/^প্রতি\s*/,'').replace(/^\//,'');
 const rawEmoji=str(pick(p,['image','emoji','icon','illustration']));
 return {id:pick(p,['id','productId','product_id']) as string|number ?? fallback?.id ?? index+1,
  slug, name,emoji:rawEmoji && !/^https?:|^\//.test(rawEmoji) ? rawEmoji : fallback?.emoji || '🛍️',
  category:category || fallback?.category || 'other',unit,price,change,
  description:str(pick(p,['description','summary','subtitle','details'])) || fallback?.description || `${name}-এর আজকের বাজারদর ও বিভিন্ন বাজারে মূল্য তুলনা।`,
  minimum:pick(p,['minimumPrice','minimum_price','minPrice','min_price'])===undefined? undefined:numericValue(pick(p,['minimumPrice','minimum_price','minPrice','min_price'])),
  maximum:pick(p,['maximumPrice','maximum_price','maxPrice','max_price'])===undefined? undefined:numericValue(pick(p,['maximumPrice','maximum_price','maxPrice','max_price'])),
  average:pick(p,['averagePrice','average_price','avgPrice','avg_price'])===undefined? undefined:numericValue(pick(p,['averagePrice','average_price','avgPrice','avg_price'])),
  markets};
}
async function getRemote(path: string): Promise<unknown> {
 for(const base of API_BASES) {
  try {
   const res=await fetch(`${base}${path}`, {next:{revalidate:600},signal:AbortSignal.timeout(2400)});
   if (res.ok) return await res.json();
  }catch { /* Try the alternative API. */ }
 }
 return null;
}
export async function getProducts(): Promise<{products: Product[]; isSnapshot: boolean}> {
 const response=await getRemote('/products');
 const products=list(response,['data','products','items','result']).map(normalizeProduct).filter((p):p is Product=>Boolean(p));
 if(products.length) return {products,isSnapshot:false};
 return {products:snapshotProducts,isSnapshot:true};
}
export async function getCategories(): Promise<Category[]> {
 const response=await getRemote('/categories');
 const items=list(response,['categories','data','items']);
 const mapped=items.map((item): Category|null=>{
  const c=record(item), slug=categorySlug(pick(c,['slug','id','value','name']) || item);
  const fallback=knownCategories.find(x=>x.slug===slug);
  if(!slug) return null;
  return {slug,name:str(pick(c,['nameBn','name_bn','name','title'])) || fallback?.name || slug,emoji:str(pick(c,['emoji','icon'])) || fallback?.emoji || '🛍️'};
 }).filter((c):c is Category=>Boolean(c));
 return mapped.length ? mapped : knownCategories;
}
export async function getCategoryProducts(slug: string): Promise<{products:Product[];isSnapshot:boolean}> {
 const all=await getProducts();
 if(all.isSnapshot) return {...all,products:all.products.filter(p=>p.category===slug)};
 const response=await getRemote(`/products?category=${encodeURIComponent(slug)}`);
 const scoped=list(response,['products','data','items','result']).map(normalizeProduct).filter((p):p is Product=>Boolean(p));
 return {...all,products:scoped.length ? scoped : all.products.filter(p=>p.category===slug)};
}
export async function getProductBySlug(slug:string):Promise<{product:Product;isSnapshot:boolean}|null> {
 const all=await getProducts();
 const found=all.products.find(p=>p.slug===slug || String(p.id)===slug);
 if(!found) return null;
 if(all.isSnapshot) return {product:found,isSnapshot:true};
 const detail=await getRemote(`/products/${encodeURIComponent(String(found.id))}`);
 const data=record(detail);
 const item=record(pick(data,['data','product','item']));
 const normalized=normalizeProduct(Object.keys(item).length?item:detail,0);
 // Preserve canonical route information from the product list when detail omits it.
 return {product:normalized?{...found,...normalized,slug:found.slug,markets:normalized.markets.length?normalized.markets:found.markets}:found,isSnapshot:false};
}
