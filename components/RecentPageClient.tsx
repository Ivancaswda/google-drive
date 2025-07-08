'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

import { Separator } from "@/components/ui/separator";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { convertFileSize } from "@/lib/utils";
import { Thumbnail } from "@/components/Thumbnail";
import ActionDropdown from "@/components/ActionDropdown";
import Sort from "@/components/Sort";

interface UsageSummary {
    title: string;
    size: number;
    latestDate: string;
    url: string;
    icon: string;
}

interface DashboardClientProps {
    usageSummary: UsageSummary[];
    files: Models.DocumentList<Models.Document>;
}

const RecentPageClient = ({ usageSummary, files }: DashboardClientProps) => {
    const [selectedType, setSelectedType] = useState("all");
    const [sortBy, setSortBy] = useState("newest");


    const filteredSummary =
        selectedType === "all"
            ? usageSummary
            : usageSummary.filter((summary) => summary.title === selectedType);

    const fileTypes = ["all", ...usageSummary.map((s) => s.title.toLowerCase())];
    const filteredFiles =
        selectedType === "all"
            ? files
            : files.filter((file) => file.type === selectedType);

    const sortedFiles = [...filteredFiles].sort((a, b) => {
        const dateA = Date.parse(a.$createdAt);
        const dateB = Date.parse(b.$createdAt);

        if (sortBy === "newest") {
            return dateB - dateA;
        } else if (sortBy === "oldest") {
            return dateA - dateB;
        } else if (sortBy === "name-a") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "name-z") {
            return b.name.localeCompare(a.name);
        }
        return 0;
    });


    const formatDateToRus = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (
        <div className="">



            <section className="dashboard-recent-files mt-10 w-full">
                <h2 className="h3 xl:h2 mb-4 text-light-100">Недавние файлы</h2>
                {sortedFiles.length > 0 ? (
                    <div className="overflow-auto rounded-lg border border-gray-200">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th className="px-4 py-3">Название</th>
                                <th className="px-4 py-3">Владелец</th>
                                <th className="px-4 py-3">Дата изменения</th>
                                <th className="px-4 py-3">Размер</th>
                                <th className="px-4 py-3">Действия</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-900">
                            {sortedFiles.slice(0, 5).map((file: Models.Document) => (
                                <tr key={file.$id} className="border-t transition hover:bg-gray-50">
                                    <td className="flex items-center gap-2 px-4 py-3">
                                        <Thumbnail
                                            type={file.type}
                                            extension={file.extension}
                                            url={file.url}
                                        />
                                        <Link
                                            href={file.url}
                                            target="_blank"
                                            className="hover:underline"
                                        >
                                            {file.name.slice(0, 16)}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3">  {file.owner ? (
                                        <>
                                            <div>{file.owner.fullName}</div>
                                            <div className="text-xs text-gray-500">{file.owner.email}</div>
                                        </>
                                    ) : (
                                        "—"
                                    )}</td>
                                    <td className="px-4 py-3">

                                        {formatDateToRus(file.$updatedAt || file.$createdAt)}

                                    </td>
                                    <td className="px-4 py-3">{convertFileSize(file.size)}</td>
                                    <td className="flex items-center justify-center px-4 py-3">
                                        <ActionDropdown file={file}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="empty-list">No files uploaded</p>
                )}
            </section>
        </div>
    );
};
export default RecentPageClient