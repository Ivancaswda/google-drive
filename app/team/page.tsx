"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Link from "next/link";
import HeroExplore from "@/components/HeroExplore";

function TeamPage() {
    const images = [
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Google_Drive_logo.png", // Логотип Google Drive
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", // Google логотип (цветной)
        "https://cdn.dribbble.com/users/2046015/screenshots/15421106/media/78133fa233e87964fd8ef2044a89f04e.png", // Google Workspace UI (Dribbble)
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/google_cloud_storage.jpg", // Google Cloud хранилище
        "https://cdn-attachments.timesofmalta.com/b7de08869336d8096fb11be912a97f3f7eb67f4d-1631105578-a3e219e8-1920x1280.jpg", // Google Workspace логотип
        "https://cdn-attachments.timesofmalta.com/b7de08869336d8096fb11be912a97f3f7eb67f4d-1631105578-a3e219e8-1920x1280.jpg", // Google Docs иконка
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Team_Pods_2.max-1600x1600.format-webp.webp", // Google Sheets иконка
        "https://www.workdesign.com/wp-content/uploads/2020/03/HOK-DirecTV-office-Photo-courtesy-HOK-Credit-Eric-Laignel-photographer.jpg", // Gmail иконка
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Team_Pods_2.max-1600x1600.format-webp.webp", // Chrome логотип
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/2023_12_05_Google_SJT_415.max-1600x1600.format-webp.webp", // Google Drive document
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/2023_12_05_Google_SJT_415.max-1600x1600.format-webp.webp", // Логотип Google Drive
        "https://www.workdesign.com/wp-content/uploads/2020/03/HOK-DirecTV-office-Photo-courtesy-HOK-Credit-Eric-Laignel-photographer.jpg", // Google логотип (цветной)
        "https://cdn.dribbble.com/users/2046015/screenshots/15421106/media/78133fa233e87964fd8ef2044a89f04e.png", // Google Workspace UI (Dribbble)
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/google_cloud_storage.jpg", // Google Cloud хранилище
        "https://1000logos.net/wp-content/uploads/2021/05/Google-Workspace-logo.png", // Google Workspace логотип
        "https://cdn-attachments.timesofmalta.com/b7de08869336d8096fb11be912a97f3f7eb67f4d-1631105578-a3e219e8-1920x1280.jpg", // Google Docs иконка
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Team_Pods_2.max-1600x1600.format-webp.webp", // Google Sheets иконка
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Team_Pods_2.max-1600x1600.format-webp.webp", // Gmail иконка
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/2023_12_05_Google_SJT_415.max-1600x1600.format-webp.webp", // Chrome логотип
        "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/2023_12_05_Google_SJT_415.max-1600x1600.format-webp.webp", // Google Drive document

    ];
    return (
        <div>
            <div
                className="relative mx-auto flex h-screen w-full max-w-full flex-col items-center justify-center overflow-hidden rounded-3xl">
                <h2 className="relative z-20 mx-auto max-w-4xl text-balance text-center text-2xl font-bold text-white md:text-4xl lg:text-6xl">
                    Приветсвуем себя как команда
                    <span
                        className="bg-blue-500/40 relative z-20 inline-block rounded-xl px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
              Google
            </span>{" "}

                </h2>
                <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
                   К сожалению или к счастью мы не являемся ею но готовы репликировать ее творчества, эмоции и идеи
                </p>

                <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button
                        className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black">
                        Присоединиться к нам
                    </button>
                    <a href="https://drive.google.com/">
                        <button
                            className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black">
                            Читать больше
                        </button>
                    </a>
                </div>

                {/* overlay */}
                <div className="absolute inset-0 z-10 size-full bg-black/80 dark:bg-black/40"/>
                <ThreeDMarquee
                    className="pointer-events-none absolute inset-0 size-full"
                    images={images}
                />


            </div>
            <HeroExplore/>
        </div>
    );
}
export default TeamPage
