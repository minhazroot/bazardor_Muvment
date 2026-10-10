'use client';
import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Product, PriceSort } from '@/lib/types';
import { bnNumber, sortProducts } from '@/lib/numbers';
import { ProductGrid } from './product-card';
export default function SortableProducts({products,subtitle}:{products:Product[],subtitle?:string}) {
 const [sort,setSort]=useState<PriceSort>('default');
 const sorted=useMemo(()=>sortProducts(products,sort),[products,sort]);
 return <>
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-[#829387]">{subtitle || `মোট ${bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}</p></div>
   <div className="relative flex items-center gap-2 text-sm"><label htmlFor="product-sort" className="font-semibold text-[#536b59]">সাজান</label><select id="product-sort" value={sort} onChange={e=>setSort(e.target.value as PriceSort)} className="appearance-none rounded-lg border border-[#d8e8dc] bg-white py-2.5 pr-9 pl-3 text-[#365a43] outline-offset-2"><option value="default">ডিফল্ট</option><option value="low">দাম: কম থেকে বেশি</option><option value="high">দাম: বেশি থেকে কম</option></select><ChevronDown aria-hidden size={15} className="pointer-events-none absolute right-3 text-[#5e8066]"/></div>
  </div>
  <ProductGrid products={sorted}/>
 </>;
}
