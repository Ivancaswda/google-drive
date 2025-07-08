import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import {getFiles, getTotalSpaceUsed} from "@/lib/actions/file.actions";
import {getUsageSummary} from "@/lib/utils";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
    const [files, totalSpace] = await Promise.all([
        getFiles({ types: [], limit: 10 }),
        getTotalSpaceUsed(),
    ]);

    // Get usage summary
    const usageSummary = getUsageSummary(totalSpace);



    const used = totalSpace.used;
    const total = 2 * 1024 ** 3;
  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <Sidebar currentUser={currentUser} {...currentUser} used={used} total={total} />

      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">{children}</div>
      </section>

      <Toaster />
    </main>
  );
};
export default Layout;
