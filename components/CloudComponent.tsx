"use client";

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { convertFileSize } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/user.actions";
import RecentPageClient from "@/components/RecentPageClient";
import {loadStripe} from "@stripe/stripe-js";

const chartConfig = {
    size: {
        label: "Size",
    },
    used: {
        label: "Used",
        color: "#1a73e8", // Google blue
    },
} satisfies ChartConfig;
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const CloudComponent = ({ used = 0, usageSummary, files }: { used: number, usageSummary: any, files: any }) => {
    const chartData = [{ storage: "used", used, fill: "#1a73e8" }];
    const [user, setUser] = useState<{ storageLimit?: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        }
        fetchUser();
    }, []);

    const storageLimitNum = Number(user?.storageLimit) || 1 * 1024 ** 3; // 1GB fallback
    const percentUsed = (used / storageLimitNum) * 100;

    const handleClick = async () => {
        const res = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: user?.$id }),
        });
        const data = await res.json();
        const stripe = await stripePromise;
        console.log(stripe)
        stripe?.redirectToCheckout({ sessionId: data.id });
        console.log(data)
    };

    return (<div className="mx-auto max-w-full rounded-lg bg-white ">
            <Card className="flex flex-col items-start gap-6 p-6">
                <CardHeader className="w-full px-0">
                    <CardTitle className="mb-1 text-xl font-semibold text-gray-900">
                        Хранилище Google Drive
                    </CardTitle>
                    <CardDescription className="mb-4 flex items-end gap-2 text-gray-600">
                        <p> Занято
                            <span className='mt-2 text-3xl text-black'> {convertFileSize(used)}</span> из {convertFileSize(storageLimitNum)}
                        </p>
                    </CardDescription>

                    {/* Прогресс-бар */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-full bg-blue transition-all duration-500"
                            style={{width: `${percentUsed}%`}}
                        />
                    </div>

                    {/* Процент снаружи полоски */}
                    <div className="mt-2 text-left text-sm font-medium text-gray-700">
                        {percentUsed.toFixed(1)}% использовано
                    </div>
                </CardHeader>
                {user?.storageLimit !== 2 * 1024 ** 3 &&
                <CardContent className=" px-0">

                        <button onClick={handleClick}
                        className="hover:bg-blue-700 focus:ring-blue-500 flex w-full items-center gap-2 rounded-full border border-black px-5 py-2  text-sm font-semibold text-[#1b49ff]  transition focus:outline-none focus:ring-2"
                        type="button"
                    >
                        <svg  viewBox="0 0 192 192" width='22' height='22' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='#FBBC04' d="M107.888 67.1L81.2424 88.7609C79.3499 90.3388
                            76.9629 91.2011 74.4989 91.1972C72.3075 91.1848 70.173 90.4985
                             68.3851 89.2314C66.5971 87.9643 65.2423 86.1778 64.5044 84.1143C63.7665
                             82.0509 63.6814 79.8104 64.2605 77.6968C64.8396 75.5833 66.0549 73.6992
                             67.7415 72.3L94.2057 50.38L107.888 67.1Z"></path>
                            <path fill="#34A853" d='M111.999 106.979V133.335C112.005 134.731 111.736 136.113 111.207 137.404C110.679 138.696 109.901 139.87 108.918 140.86C107.935 141.851 106.767 142.638 105.48 143.176C104.193 143.715 102.812 143.995 101.416 144C95.5665 144 90.2891 139.226 90.2891 133.335V106.979L111.999 106.979Z'>
                            </path>
                            <path fill="#4285F4" d="M112 58.6793V123.27L90.2832 106.98V58.6793H112Z"></path>
                            <path fill="#EA4335" d="M90.2832 58.6789C90.2844 57.0946 90.6361 55.5301 91.3132 54.0978C91.9903 52.6654 92.9759 51.4005 94.1995 50.3938C96.2252 48.7295 98.7991 47.8808 101.418 48.0137C103.605 48.034 105.733 48.725 107.514 49.9934C109.296 51.2618 110.645 53.0464 111.38 55.1062C112.114 57.1659 112.199 59.4015 111.622 61.5108C111.045 63.6202 109.835 65.5016 108.154 66.901L90.2905 81.419V58.6789H90.2832Z"></path>
                            <path fill="#4285F4" d="M148.631 150.749V158.065H158.382C166.873 149.531 173.523 139.346 177.92 128.14C182.317 116.933 184.368 104.944 183.946 92.9128C183.523 80.8819 180.637 69.0657 175.465 58.1951C170.293 47.3245 162.945 37.6308 153.876 29.7137H144.381V37.4331C152.648 44.2455 159.379 52.7315 164.13 62.3325C168.881 71.9336 171.545 82.432 171.947 93.1369C172.348 103.842 170.478 114.51 166.459 124.44C162.441 134.37 156.365 143.336 148.631 150.749H148.631Z"></path>
                            <path fill="#EA4335" d="M18.9531 53.46V60.7667H28.6922C33.9295 50.7397 41.3416 42.01 50.3865 35.2159C59.4314 28.4219 69.8804 23.7352 80.9694 21.4986C92.0585 19.262 103.507 19.5321 114.478 22.289C125.45 25.046 135.666 30.2201 144.381 37.4331L153.876 29.7137C143.98 21.0728 132.274 14.7572 119.618 11.2304C106.962 7.70358 93.6771 7.05502 80.7379 9.33231C67.7987 11.6096 55.5335 16.7549 44.8422 24.3908C34.1509 32.0267 25.3049 41.9594 18.9531 53.46Z"> </path>
                            <path fill="#34A853" d="M148.631 150.749C140.151 158.923 129.885 165.011 118.645 168.531C107.405 172.051 95.5006 172.907 83.8729 171.031C72.2453 169.154 61.214 164.597 51.6521 157.72C42.0903 150.843 34.2604 141.835 28.7821 131.408H19.2832V139.13C25.9506 150.986 35.2754 161.136 46.5256 168.781C57.7758 176.427 70.6451 181.361 84.1232 183.195C97.6012 185.03 111.321 183.716 124.206 179.355C137.09 174.995 148.788 167.707 158.382 158.064L148.631 150.749Z"></path>
                            <path fill="#FBBC04" d="M19.9999 96C19.9901 83.7234 22.9738 71.6296 28.6924 60.7664L18.9533 53.46C11.7128 66.5876 7.94291 81.3462 8.00065 96.3381C8.0584 111.33 11.9419 126.059 19.2833 139.131L28.7822 131.408C23.0048 120.501 19.9894 108.343 19.9999 96Z"></path>
                        </svg>
                        Купить дополнительное место
                    </button>

                </CardContent>
                }
                <div className='w-full'>


                <RecentPageClient usageSummary={usageSummary} used={used} total={user?.storageLimit} files={files} />;
                </div>
                </Card>
        </div>
    );
};

export default CloudComponent;
