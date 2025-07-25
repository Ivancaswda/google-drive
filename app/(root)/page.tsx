
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import DashboardClient from "@/components/DashboardClient";
import {getCurrentUser} from "@/lib/actions/user.actions";


const Dashboard = async () => {
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
          {/*
        <section>



          <ul className="dashboard-summary-list">
            {usageSummary.map((summary) => (
                <Link
                    href={summary.url}
                    key={summary.title}
                    className="dashboard-summary-card"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between gap-3">
                      <Image
                          src={summary.icon}
                          width={100}
                          height={100}
                          alt="uploaded image"
                          className="summary-type-icon"
                      />
                      <h4 className="summary-type-size">
                        {convertFileSize(summary.size) || 0}
                      </h4>
                    </div>

                    <h5 className="summary-type-title">{summary.title}</h5>
                    <Separator className="bg-light-400"/>
                    <FormattedDateTime
                        date={summary.latestDate}
                        className="text-center"
                    />
                  </div>
                </Link>
            ))}
          </ul>
        </section>

        <section className="dashboard-recent-files w-full ">
          <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
          {files.documents.length > 0 ? (
              <ul className="mt-5 flex flex-col gap-5">
                {files.documents.map((file: Models.Document) => (
                    <Link
                        href={file.url}
                        target="_blank"
                        className="flex items-center gap-3"
                        key={file.$id}
                    >
                      <Thumbnail
                          type={file.type}
                          extension={file.extension}
                          url={file.url}
                      />

                      <div className="recent-file-details">
                        <div className="flex flex-col gap-1">
                          <p className="recent-file-name">{file.name}</p>
                          <FormattedDateTime
                              date={file.$createdAt}
                              className="caption"
                          />
                        </div>
                        <ActionDropdown file={file}/>
                      </div>
                    </Link>
                ))}
              </ul>
          ) : (
              <p className="empty-list">No files uploaded</p>
          )}
        </section>
        */}

        <DashboardClient  usageSummary={usageSummary} used={used} total={total} files={files} />;
      </div>
  );
};

export default Dashboard;
