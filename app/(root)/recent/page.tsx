
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import {getUsageSummary } from "@/lib/utils";
import DashboardClient from "@/components/DashboardClient";
import RecentPageClient from "@/components/RecentPageClient";


const RecentPage = async () => {
    // Parallel requests
    const [Files, totalSpace] = await Promise.all([
        getFiles({ types: [], limit: 10 }),
        getTotalSpaceUsed(),
    ]);
    const files = Files.documents.filter((file) => !file.isTrashed)
    console.log(files)

    // Get usage summary
    const usageSummary = getUsageSummary(totalSpace);



    const used = totalSpace.used;
    const total = 2 * 1024 ** 3;

    return (
        <div className="">
            <RecentPageClient usageSummary={usageSummary} used={used} total={total} files={files} />;
        </div>
    );
};

export default RecentPage;
