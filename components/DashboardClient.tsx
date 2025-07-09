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

const DashboardClient = ({ usageSummary, files }: DashboardClientProps) => {
    const [selectedType, setSelectedType] = useState("Все");
    const [sortBy, setSortBy] = useState("newest");


    const filteredSummary =
        selectedType === "Все"
            ? usageSummary
            : usageSummary.filter((summary) => summary.title === selectedType);

    const fileTypes = ["Все", ...usageSummary.map((s) => s.title.toLowerCase())];
    const filteredFiles =
        selectedType === "Все"
            ? files
            : files.filter((file) => file.type === selectedType);

    const sortedFiles = [...filteredFiles].sort((a, b) => {
        const dateA = Date.parse(a.$createdAt);
        const dateB = Date.parse(b.$createdAt);

        switch (sortBy) {
            case "$createdAt-desc":
                return dateB - dateA;
            case "$createdAt-asc":
                return dateA - dateB;
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            case "size-asc":
                return a.size - b.size;
            case "size-desc":
                return b.size - a.size;
            default:
                return 0;
        }
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
            <section>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                    {/* Filter by type */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-sm text-black">Фильтровать:</h1>

                        <Select
                            value={selectedType}
                            onValueChange={(value) => setSelectedType(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>

                            <SelectContent>
                                {fileTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort files */}
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-black">Сортирировать:</p>
                        <Sort sortBy={sortBy} onChange={setSortBy} />
                    </div>
                </div>
            </section>


            <section className="dashboard-recent-files mt-10 w-full">
                <h2 className="h3 xl:h2 mb-4 text-light-100">Все файлы</h2>
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
                            {sortedFiles.map((file: Models.Document) => (
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
                    <div>

                        <img
                            src="https://ssl.gstatic.com/docs/doclist/images/empty_state_recents_v4.svg"
                            alt="No starred files"
                            className="mx-auto mb-4 h-[200px] w-[250px]"
                        />
                        <p className="text-center text-lg ">Файлы не найдены!</p>
                        <p className="mt-2 text-center text-sm text-gray-600">Вы пока не загрузили не одного файла в google drive</p>
                    </div>
                )}
            </section>
        </div>
    );
};
export default DashboardClient