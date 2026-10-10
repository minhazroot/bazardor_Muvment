'use client';
import { Toaster } from 'react-hot-toast';
export default function ToastProvider(){
 return <Toaster position="top-right" toastOptions={{duration:4000,style:{borderRadius:'11px',background:'#fff',color:'#264c35',fontFamily:'inherit'}}}/>;
}
