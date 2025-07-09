import { Suspense } from 'react';
import ClientSuccess from "@/components/ClientSuccess";
import {Loader2Icon} from "lucide-react";

export default function SuccessPage() {

    return (
        <Suspense fallback={<div className='flex h-screen w-full items-center justify-center'>
            <Loader2Icon className='animate-spin text-blue'/>
        </div>}>
            <ClientSuccess />
        </Suspense>
    )
}
