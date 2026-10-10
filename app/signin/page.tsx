import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthForm from '@/components/auth-form';
export const metadata:Metadata={title:'সাইন ইন'};
export default function SignInPage(){return <Suspense fallback={<div className="shell min-h-[520px] animate-pulse py-20 text-center">সাইন ইন পেজ লোড হচ্ছে…</div>}><AuthForm mode="signin"/></Suspense>}
