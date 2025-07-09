
"use client";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";
import {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";
import {getCurrentUser} from "@/lib/actions/user.actions";

const chartConfig = {
    size: {
        label: "Size",
    },
    used: {
        label: "Used",
        color: "white",
    },
} satisfies ChartConfig;

const CloudComponent = ({ used = 0 }: { used: number }) => {
    const chartData = [{ storage: "used", 10: used, fill: "white" }];
    const [user, setUser] = useState<{ storageLimit?: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        }
        fetchUser();
    }, []);
    console.log(user)
    return (
        <div>
            <Card className="flex  items-center bg-blue text-white">
                <CardContent className="flex-1  p-0">
                    <ChartContainer config={chartConfig} className="chart-container  ">
                        <RadialBarChart
                            data={chartData}
                            startAngle={90}
                            endAngle={Number(calculatePercentage(used)) + 90}
                            innerRadius={80}
                            outerRadius={110}
                        >
                            <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="polar-grid"
                                polarRadius={[86, 74]}
                            />
                            <RadialBar dataKey="storage"  cornerRadius={10}/>
                            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                <Label
                                    content={({viewBox}) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="chart-total-percentage "
                                                    >
                                                        {used && calculatePercentage(used)
                                                            ? parseFloat(calculatePercentage(used)).toFixed(2)
                                                            : "0.00"}
                                                        %
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-white/70"
                                                    >
                                                        Место занято
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </PolarRadiusAxis>
                        </RadialBarChart>
                    </ChartContainer>
                </CardContent>
                <CardHeader className="chart-details">
                    <CardTitle className="chart-title">Доступное хранилище</CardTitle>
                    <CardDescription className="chart-description">
                        {used ? convertFileSize(used) : "1GB"} / {convertFileSize(Number(user?.storageLimit) || 1024 ** 3)}
                    </CardDescription>
                </CardHeader>

            </Card>
            <div className='mt-6 flex w-full items-center justify-center'>
                <button
                    className='mx-auto mt-4 rounded-3xl border border-blue  px-4 py-6 font-semibold  text-blue transition hover:scale-105 hover:bg-muted/50 '>
                    Увеличить объём хранилища
                </button>
            </div>

        </div>

    );
};
export default CloudComponent
