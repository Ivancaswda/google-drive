import React from 'react'
import {getFiles, getTotalSpaceUsed} from "@/lib/actions/file.actions";
import CloudComponent from "@/components/CloudComponent";

const Page = async () => {
    const [_, totalSpace] = await Promise.all([
        getFiles({ types: [], limit: 10 }),
        getTotalSpaceUsed(),
    ]);

    const used = totalSpace.used;
    return (
        <div>
            <h1 className='mb-4 text-2xl font-semibold'>Хранилище </h1>
            <CloudComponent used={used}/>
        </div>
    )
}
export default Page
