import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import  ChartClient  from "./ChartClient";

export const Chart = async () => {
  const [_, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const used = totalSpace.used;
  const total = 2 * 1024 ** 3;

  return <ChartClient used={used} total={total} />;
};
