import { Suspense } from 'react';
import ClientSuccess from "@/components/ClientSuccess";

export default function SuccessPage() {


    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <ClientSuccess />
        </Suspense>
    )
}
