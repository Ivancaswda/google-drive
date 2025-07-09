// app/success/ClientSuccess.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useUpload} from "@/context/UploadContext";
import {updateUserStorageLimit} from "@/lib/actions/user.actions";
import {CheckCircle, Loader2Icon, XIcon} from "lucide-react";

 function ClientSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const {  setIsBought } = useUpload()
     const [loading, setLoading] = useState(true);
     const [sessionInfo, setSessionInfo] = useState<any>(null);

     useEffect(() => {
         const fetchSession = async () => {
             const sessionId = searchParams.get('session_id');
             if (!sessionId) return;

             try {
                 const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
                 const data = await res.json();

                 await updateUserStorageLimit(data?.metadata?.userId, 2 * 1024 * 1024 * 1024);
                 setSessionInfo(data);
                 setIsBought(true)
             } catch (err) {
                 console.error('Ошибка при получении сессии:', err);
             } finally {
                 setLoading(false);
             }
         };

         fetchSession();
     }, [searchParams]);
     console.log(sessionInfo)
     if (loading) return <div className='flex h-screen w-full items-center justify-center'>
         <Loader2Icon className='animate-spin text-blue'/>
     </div>;
     if (!sessionInfo) return <div className='flex w-full items-center justify-center'>
         <XIcon/>
         Сессия не найдена
         <Link href="/">
             <Button className="w-full bg-green transition hover:bg-red">На главную</Button>
         </Link>
     </div>;
     return (
         <div className="bg-green-50 flex min-h-screen flex-col items-center justify-center px-4">
            <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                <CheckCircle className="text-green-500 mx-auto mb-4 size-16"/>
                <h1 className="text-green-600 mb-2 text-3xl font-bold">Оплата прошла успешно!</h1>
                <p className="mb-4 text-gray-700">Спасибо за покупку 😊</p>

                <div className="mb-6 space-y-2 text-left text-gray-600">
                    <p><span className="font-medium">Email:</span> {sessionInfo.metadata?.email}</p>
                    <p>
                        <span className="font-medium">Сумма:</span> {(sessionInfo.amount_total / 100).toFixed(2)}{' '}
                        {sessionInfo.currency.toUpperCase()}
                    </p>
                    <p>
                        <span className="font-medium">Товар:</span> Расширение хранилища на 2 ГБ
                    </p>

                </div>

                <Link href="/">
                    <Button className="hover:bg-green-600 w-full bg-green transition">На главную</Button>
                </Link>
            </div>
         </div>
     );
 }

export default ClientSuccess