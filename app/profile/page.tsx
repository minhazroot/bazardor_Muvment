import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, Mail, Pencil, UserRound } from 'lucide-react';
import { auth } from '@/lib/auth';
export const metadata:Metadata={title:'আমার প্রোফাইল'};
export default async function ProfilePage(){
 const session=await auth.api.getSession({headers:await headers()});
 if(!session) redirect('/signin?reason=protected&callbackURL=%2Fprofile');
 const user=session.user;
 return <main className="shell pb-24 pt-12"><div className="mx-auto max-w-[670px]"><div className="mb-7"><p className="text-sm font-bold text-[#45935f]">আমার অ্যাকাউন্ট</p><h1 className="mt-1 text-[29px] font-extrabold text-[#204b34]">আমার প্রোফাইল</h1><p className="mt-1 text-sm text-[#8b9e8f]">আপনার ব্যক্তিগত তথ্য দেখুন ও হালনাগাদ করুন।</p></div>
  <section className="surface overflow-hidden rounded-2xl"><div className="h-28 bg-[linear-gradient(100deg,#d6f4df,#eef9e9)]"/><div className="px-6 pb-7 sm:px-8"><div className="-mt-10 mb-4 grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-[#e0f0e5] text-[36px] text-[#318959]"><UserRound size={38}/></div><h2 className="text-2xl font-extrabold text-[#254e38]">{user.name}</h2><p className="mt-1 text-[13px] text-[#849789]">বাজার দর সদস্য</p><div className="mt-7 space-y-5 border-t border-[#e9f0ea] pt-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#edf8f0] text-[#509369]"><UserRound size={20}/></span><div><p className="text-xs text-[#829787]">নাম</p><p className="font-bold text-[#2c5139]">{user.name}</p></div></div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#edf8f0] text-[#509369]"><Mail size={19}/></span><div><p className="text-xs text-[#829787]">ইমেইল</p><p className="break-all font-bold text-[#2c5139]">{user.email}</p></div></div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#edf8f0] text-[#509369]"><CalendarDays size={19}/></span><div><p className="text-xs text-[#829787]">সদস্য হয়েছেন</p><p className="font-bold text-[#2c5139]">{new Intl.DateTimeFormat('bn-BD',{year:'numeric',month:'long',day:'numeric',timeZone:'Asia/Dhaka'}).format(new Date(user.createdAt))}</p></div></div></div><Link href="/profile/edit" className="primary-button mt-7"><Pencil size={16}/> তথ্য পরিবর্তন করুন</Link></div></section></div></main>;
}
