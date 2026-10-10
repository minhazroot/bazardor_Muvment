import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import EditProfileForm from '@/components/edit-profile-form';
export const metadata:Metadata={title:'তথ্য পরিবর্তন করুন'};
export default async function EditProfilePage(){
 const session=await auth.api.getSession({headers:await headers()});
 if(!session) redirect('/signin?reason=protected&callbackURL=%2Fprofile%2Fedit');
 return <EditProfileForm initialName={session.user.name}/>;
}
