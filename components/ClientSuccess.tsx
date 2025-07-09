// app/success/ClientSuccess.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import {useEffect, useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

 function ClientSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

     const [loading, setLoading] = useState(true);
     const [sessionInfo, setSessionInfo] = useState<any>(null);

     useEffect(() => {
         const fetchSession = async () => {
             const sessionId = searchParams.get('session_id');
             if (!sessionId) return;

             try {
                 const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
                 const data = await res.json();

                 setSessionInfo(data);
             } catch (err) {
                 console.error('Ошибка при получении сессии:', err);
             } finally {
                 setLoading(false);
             }
         };

         fetchSession();
     }, []);
     console.log(sessionInfo)
     if (loading) return <div>Загрузка...</div>;
     if (!sessionInfo) return <div>Сессия не найдена</div>;
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Оплата прошла успешно!</h1>
            <p>Email: {sessionInfo.metadata?.email}</p>
            <p>Сумма: {sessionInfo.amount_total / 100} {sessionInfo.currency.toUpperCase()}</p>
            <Link href='/'><Button>Перейти на главную</Button></Link>
        </div>
    );
 }

export default ClientSuccess