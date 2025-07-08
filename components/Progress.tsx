import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value,  }, ) => {
        return (
            <div
                className={cn(
                    "relative h-2 w-full overflow-hidden rounded-full ",
                    className
                )}
            >
                <div
                    className="h-full rounded-full bg-blue transition-all duration-500 ease-in-out"
                    style={{width: `${value}%`}}
                />
            </div>
        );
    }
);
Progress.displayName = "Progress";
