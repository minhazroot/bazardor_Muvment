import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getCategories, getCategoryProducts } from '@/lib/products';
import SortableProducts from '@/components/sortable-products';
import SnapshotNote from '@/components/snapshot-note';
import { bnNumber } from '@/lib/numbers';

type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const category=(await getCategories()).find(c=>c.slug===slug);return {title:category?`${category.name} এর আজকের দাম`:'ক্যাটাগরি পাওয়া যায়নি'};}
export default async function CategoryPage({params}:Props){
 const {slug}=await params;
 const categories=await getCategories();
 const category=categories.find(c=>c.slug===slug);
 if(!category) notFound();
 const {products,isSnapshot}=await getCategoryProducts(slug);
 if(products.length===0) notFound();
 return <main className="shell pb-24 pt-9 sm:pt-13">
  <nav className="mb-7 flex items-center gap-1.5 text-[13px] text-[#8ca08d]" aria-label="ব্রেডক্রাম্ব"><Link href="/" className="hover:text-[#228452]"><Home size={15}/></Link><ChevronRight size={14}/><span>{category.name}</span></nav>
  <div className="mb-9 flex items-center gap-4 rounded-2xl border border-[#e1eee3] bg-[linear-gradient(110deg,#f0fbef,#ffffff)] p-6 sm:p-8"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white text-[43px] shadow-sm">{category.emoji}</div><div><h1 className="text-[31px] font-extrabold text-[#1d5533]">{category.name}</h1><p className="mt-1 text-sm text-[#78937d]">{bnNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p></div></div>
  {isSnapshot&&<SnapshotNote/>}
  <SortableProducts products={products}/>
 </main>;
}
