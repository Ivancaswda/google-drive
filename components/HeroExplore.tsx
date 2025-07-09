import React from "react";
import { Timeline } from "@/components/ui/timeline";
import {GithubIcon} from "lucide-react";
import Link from "next/link";

function HeroExplore() {
    const data = [
        {
            title: "2024",
            content: (
                <div>
                    <p className="mb-8 text-lg font-normal text-neutral-800 dark:text-neutral-200 md:text-xl">
                        Работаю над AI-проектами: разрабатываю сайты с использованием современных технологий
                        (Next.js, React Native, Tailwind, OpenAI API и др.). Также создаю реплики известных интерфейсов и сервисов.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://assets.aceternity.com/pro/bento-grids.png"
                            alt="AI project example"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/features-section.png"
                            alt="feature ui"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/pro/hero-sections.png"
                            alt="UI replicate"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/cards.png"
                            alt="cards layout"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Сентябрь 2023",
            content: (
                <div>
                    <p className="mb-8 text-lg font-normal text-neutral-800 dark:text-neutral-200 md:text-xl">
                        Начал путь как fullstack-разработчик. Изучал React, Next.js, Node.js, Tailwind CSS и начал
                        создавать свои первые сайты — от простых лендингов до полноценного функционала.
                    </p>
                    <p className="mb-8 text-lg font-normal text-neutral-800 dark:text-neutral-200 md:text-xl">
                        Реплицировал популярные интерфейсы (как у Apple, Google и др.) и учился через практику.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://assets.aceternity.com/templates/startup-1.webp"
                            alt="startup"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/templates/startup-3.webp"
                            alt="startup 2"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/templates/startup-2.webp"
                            alt="ui clone"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/templates/startup-4.webp"
                            alt="ui clone 2"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Последнее время",
            content: (
                <div>
                    <p className="mb-4 text-lg font-normal text-neutral-800 dark:text-neutral-200 md:text-xl">
                        Что добавлено за последнее время:
                    </p>
                    <div className="mb-8">
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Netflix
                        </div>
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Educatify
                        </div>
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Linvify AI
                        </div>
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Google docs
                        </div>
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Quanto Market
                        </div>
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Spotify
                        </div>
                        <div
                            className="flex items-center gap-2 text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
                            ✅ Codevex
                        </div>
                        <a target='_blank' href='https://github.com/Ivancaswda'>

                            <div
                                className="mt-3 flex items-center gap-2 text-lg text-[#0a56e4] text-neutral-700  hover:text-[#0a56e2] dark:text-neutral-300 md:text-xl">
                                Посмотреть остальные на <GithubIcon/> github
                            </div>
                        </a>

                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://assets.aceternity.com/cards.png"
                            alt="admin panel"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/features-section.png"
                            alt="ai site"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/pro/bento-grids.png"
                            alt="ui system"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                        <img
                            src="https://assets.aceternity.com/pro/hero-sections.png"
                            alt="landing clone"
                            className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full text-clip">
            <Timeline data={data} />
        </div>
    );
}
export default HeroExplore