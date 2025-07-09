import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";


const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";



  return (
      <div className="page-container">
        <section className="w-full">
          <h1 className="h1 capitalize">{type}</h1>

          <div className="total-size-section">
            <p className="body-1">
              Total: <span className="h5">0 MB</span>
            </p>


          </div>
        </section>

        {/* Render the files */}

      </div>
  );
};

export default Page;
