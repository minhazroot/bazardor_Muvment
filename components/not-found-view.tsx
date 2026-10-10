import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFoundView({title='এই পেজটি পাওয়া যায়নি',message='আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।'}:{title?:string;message?:string}) {
 return <div className="shell flex min-h-[55vh] flex-col items-center justify-center py-20 text-center"><div className="mb-3 rounded-3xl bg-[#ecf8ef] px-8 py-4 text-[60px] font-extrabold text-[#1d8b50]">৪০৪</div><h1 className="text-[26px] font-extrabold text-[#254c34]">{title}</h1><p className="mt-3 max-w-md text-[#78917d]">{message}</p><Link href="/" className="primary-button mt-7"><ArrowLeft size={17}/> হোম পেজে ফিরে যান</Link></div>;
}
