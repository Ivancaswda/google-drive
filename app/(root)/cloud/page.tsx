import React from 'react'
import {getFiles, getTotalSpaceUsed} from "@/lib/actions/file.actions";
import CloudComponent from "@/components/CloudComponent";
import {getUsageSummary} from "@/lib/utils";

const Page = async () => {
    const [Files, totalSpace] = await Promise.all([
        getFiles({ types: [], limit: 10 }),
        getTotalSpaceUsed(),
    ]);

    const used = totalSpace.used;
    console.log(used)

    const files = Files.documents.filter((file:any) => !file.isTrashed)
    console.log(files)

    // Get usage summary
    const usageSummary = getUsageSummary(totalSpace);



    return (
        <div>

            <CloudComponent usageSummary={usageSummary} files={files} used={used}/>
        </div>
    )
}
export default Page
