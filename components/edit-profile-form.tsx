'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, LoaderCircle, Save, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
export default function EditProfileForm({initialName}:{initialName:string}){
 const router=useRouter();const [name,setName]=useState(initialName),[pending,setPending]=useState(false);
 async function onSubmit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();const trimmed=name.trim();
  if(trimmed.length<2) return toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
  if(trimmed.length>100) return toast.error('নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে।');
  setPending(true);
  try {
   // Official Better Auth API: https://better-auth.com/docs/concepts/users-accounts#update-user
   const {error}=await authClient.updateUser({name:trimmed});
   if(error) return toast.error(error.message || 'তথ্য পরিবর্তন করা যায়নি।');
   toast.success('আপনার তথ্য সফলভাবে আপডেট হয়েছে।');
   router.push('/profile');router.refresh();
  }catch{toast.error('সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।');}
  finally{setPending(false);}
 }
 return <main className="shell flex justify-center pb-24 pt-14"><div className="w-full max-w-[530px]"><Link href="/profile" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#658d71] hover:underline"><ArrowLeft size={16}/> প্রোফাইলে ফিরে যান</Link><div className="surface rounded-2xl p-6 sm:p-8"><div className="mb-6 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-xl bg-[#e8f6ec] text-[#21804d]"><UserRound size={27}/></span><div><h1 className="text-[25px] font-extrabold text-[#244a35]">তথ্য পরিবর্তন করুন</h1><p className="text-sm text-[#839889]">আপনার প্রোফাইলের নাম হালনাগাদ করুন।</p></div></div><form onSubmit={onSubmit}><label htmlFor="profile-name" className="form-label">আপনার নাম</label><input id="profile-name" type="text" className="form-input" autoComplete="name" required minLength={2} maxLength={100} value={name} onChange={e=>setName(e.target.value)}/><button type="submit" disabled={pending} className="primary-button mt-6 w-full">{pending?<LoaderCircle size={18} className="animate-spin"/>:<Save size={18}/>} তথ্য আপডেট করুন</button></form></div></div></main>;
}
