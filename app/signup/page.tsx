import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthForm from '@/components/auth-form';
export const metadata:Metadata={title:'সাইন আপ'};
export default function SignUpPage(){return <Suspense fallback={<div className="shell min-h-[520px] animate-pulse py-20 text-center">সাইন আপ পেজ লোড হচ্ছে…</div>}><AuthForm mode="signup"/></Suspense>}
