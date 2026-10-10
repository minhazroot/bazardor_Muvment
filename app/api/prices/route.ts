import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';
export const runtime='nodejs';
export async function GET(){
 const result=await getProducts();
 return NextResponse.json(result,{headers:{'Cache-Control':'public, s-maxage=600, stale-while-revalidate=300'}});
}
