'use client';

import { Progress } from '@/components/Progress';
import { convertFileSize } from '@/lib/utils';

interface Props {
    used: number;
    total: number;
}

const ChartClient = ({ used, total,  }: Props) => {
    const percentUsed = (used / total) * 100;
    console.log(percentUsed)
    console.log(used, total)
    return (
        <div className="hidden space-y-4 rounded-xl border border-white/10 p-4  lg:block">
            <div className="flex items-center justify-between">
                <p className="text-sm ">
                    {convertFileSize(used)} из {convertFileSize(Number(total))} использовано
                </p>
                <span className="text-sm ">{percentUsed.toFixed(2)}%</span>
            </div>
            <Progress value={percentUsed} className="h-2 border  bg-muted/50" />
        </div>
    );
};
export default ChartClient