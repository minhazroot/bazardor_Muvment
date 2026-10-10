import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, MapPin, Scale, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { auth } from '@/lib/auth';
import { getProductBySlug, getCategories } from '@/lib/products';
import { bnNumber, marketRangeStats } from '@/lib/numbers';
import { ChangeBadge } from '@/components/product-card';
import SnapshotNote from '@/components/snapshot-note';

type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const found=await getProductBySlug(slug);return {title:found?`${found.product.name} এর বিস্তারিত বাজারদর`:'পণ্য পাওয়া যায়নি'};}
export default async function ProductDetail({params}:Props){
 const {slug}=await params; const result=await getProductBySlug(slug);
 if(!result) notFound();
 const session=await auth.api.getSession({headers:await headers()});
 if(!session) redirect(`/signin?reason=protected&callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
 const {product:p,isSnapshot}=result;
 const category=(await getCategories()).find(c=>c.slug===p.category);
 const stats=marketRangeStats(p.markets);
 const minimum=p.minimum ?? stats?.min, maximum=p.maximum ?? stats?.max, average=p.average ?? stats?.avg;
 return <main className="shell pb-24 pt-8 sm:pt-12">
  <nav aria-label="ব্রেডক্রাম্ব" className="mb-6 flex items-center gap-1.5 text-sm text-[#819384]"><Link href="/" className="hover:text-[#176d46]">হোম</Link><ChevronRight size={15}/>{category&&<><Link href={`/category/${category.slug}`} className="hover:text-[#176d46]">{category.name}</Link><ChevronRight size={15}/></>}<span className="truncate text-[#315844]">{p.name}</span></nav>
  {isSnapshot&&<SnapshotNote/>}
  <section className="surface flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-8"><div className="grid h-30 w-30 shrink-0 place-items-center rounded-3xl bg-[#eef8ed] text-[69px] sm:h-38 sm:w-38">{p.emoji}</div><div className="min-w-0 flex-1"><div className="mb-3 flex flex-wrap items-center gap-2">{category&&<Link href={`/category/${category.slug}`} className="rounded-full bg-[#e9f6ee] px-3 py-1 text-xs font-bold text-[#248253]">{category.emoji} {category.name}</Link>}<span className="rounded-full border border-[#e3ebe5] px-3 py-1 text-xs text-[#63806a]">প্রতি {p.unit}</span></div><h1 className="text-[31px] font-extrabold text-[#214934] sm:text-4xl">{p.name}</h1><p className="mt-2 leading-7 text-[#718b76]">{p.description}</p><div className="mt-5 flex flex-wrap items-center gap-4"><span className="text-sm text-[#768877]">আজকের দাম <strong className="ml-1 text-[29px] font-extrabold text-[#cf3c49]">{bnNumber(p.price)} টাকা</strong></span><ChangeBadge change={p.change}/></div></div></section>
  <section className="mt-9" aria-labelledby="price-summary"><h2 id="price-summary" className="mb-5 text-[24px] font-extrabold text-[#214934]">দামের সারসংক্ষেপ</h2><div className="grid gap-4 sm:grid-cols-3">
   {([{title:'সর্বনিম্ন দাম',value:minimum,icon:TrendingDown,color:'text-[#24965e]',bg:'bg-[#eef9ef]'}, {title:'সর্বোচ্চ দাম',value:maximum,icon:TrendingUp,color:'text-[#d5673e]',bg:'bg-[#fff1e7]'}, {title:'গড় দাম',value:average,icon:Scale,color:'text-[#477fba]',bg:'bg-[#eaf2ff]'}] as const).map(s=><div key={s.title} className="surface flex items-center gap-4 rounded-xl p-5"><div className={`grid h-12 w-12 place-items-center rounded-xl ${s.bg} ${s.color}`}><s.icon size={24}/></div><div><p className="mb-1 text-sm text-[#839485]">{s.title}</p><p className="text-xl font-extrabold text-[#285038]">{s.value===undefined?'তথ্য নেই':`${bnNumber(s.value)} টাকা`}</p></div></div>)}
  </div></section>
  <section className="mt-10" aria-labelledby="market-prices"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 id="market-prices" className="text-[24px] font-extrabold text-[#214934]">বাজারভিত্তিক আজকের দাম</h2><span className="rounded-full bg-[#edf7ee] px-3 py-1 text-xs font-bold text-[#40835a]">{bnNumber(p.markets.length)}টি বাজারের তথ্য</span></div>
   {p.markets.length?<div className="overflow-hidden rounded-xl border border-[#e2eee5] bg-white">
    <div className="hidden grid-cols-[1.2fr_1fr_125px_125px] gap-3 border-b border-[#e8f0e8] bg-[#f4faf5] px-5 py-3 text-sm font-bold text-[#526f5c] sm:grid"><span>বাজারের নাম</span><span>বিভাগ / এলাকা</span><span className="text-right">সর্বনিম্ন দাম</span><span className="text-right">সর্বোচ্চ দাম</span></div>
    {p.markets.map((m,i)=><div key={`${m.name}-${i}`} className="grid grid-cols-2 gap-3 border-b border-[#ecf1eb] px-5 py-4 last:border-b-0 sm:grid-cols-[1.2fr_1fr_125px_125px] sm:items-center"><div className="col-span-2 flex items-center gap-2 font-bold text-[#2b513a] sm:col-span-1"><MapPin className="text-[#5ca977]" size={17}/>{m.name}</div><p className="col-span-2 text-sm text-[#87998a] sm:col-span-1">{m.location || '—'}</p><p className="text-sm text-[#718a7b] sm:text-right"><span className="block text-[11px] sm:hidden">সর্বনিম্ন</span><strong className="text-[#21784f]">{bnNumber(m.min??m.price)} টাকা</strong></p><p className="text-sm text-[#718a7b] sm:text-right"><span className="block text-[11px] sm:hidden">সর্বোচ্চ</span><strong className="text-[#c33a47]">{bnNumber(m.max??m.price)} টাকা</strong></p></div>)}
   </div>:<div className="surface rounded-xl p-9 text-center"><Wallet size={31} className="mx-auto mb-3 text-[#78a98a]"/><p className="font-bold text-[#315944]">বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি</p><p className="mt-2 text-sm text-[#819286]">API-তে এই পণ্যের বাজারভিত্তিক তথ্য যোগ হলে এখানে প্রতিটি বাজারের দাম দেখা যাবে।</p></div>}
  </section>
  <Link href={category?`/category/${category.slug}`:'/'} className="secondary-button mt-8"><ArrowLeft size={16}/> আগের পেজে ফিরে যান</Link>
 </main>;
}
