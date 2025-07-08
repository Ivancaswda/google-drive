// app/starred/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Models } from "node-appwrite";
import { getStarredFiles } from "@/lib/actions/file.actions";
import FileCard from "@/components/FileCard";
import TrashedFileRow from "@/components/TrashedFileRow";
import StarredFileRow from "@/components/StarredFileRow";
import {Loader2Icon} from "lucide-react"; // предположим, что такой компонент отображает файл

const StarredPage = () => {
    const [starredFiles, setStarredFiles] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStarredFiles = async () => {
            const data = await getStarredFiles();
            setStarredFiles(data);
            setLoading(false);
        };

        fetchStarredFiles();
    }, []);

    if (loading) return <p className="flex flex-col items-center justify-center gap-4 text-center">
        <Loader2Icon className='animate-spin text-blue'/>
        Загружаем помеченные файлы...</p>;

    if (starredFiles.length === 0) {
        return <div>
            <img
                src="https://ssl.gstatic.com/docs/doclist/images/empty_state_starred_files_v3.svg"
                alt="No starred files"
                className="mx-auto mb-4 h-[200px] w-[250px]"
            />
            <p className="text-center text-lg ">Нет помеченных файлов!</p>
            <p className="mt-2 text-center text-sm text-gray-600">Отметьте какой-нибудь файл чтобы он появился здесь</p>
        </div>;
    }

    return (
        <div className="w-full">
            {starredFiles.length > 0 ? (
                <div className="overflow-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Название</th>
                            <th className="px-4 py-3">Владелец</th>
                            <th className="px-4 py-3">Дата удаления</th>
                            <th className="px-4 py-3">Размер</th>
                            <th className="px-4 py-3">Действие</th>
                        </tr>
                        </thead>
                        <tbody className=" text-gray-900">
                        {starredFiles.map((file: Models.Document) => (
                            <StarredFileRow key={file.$id} file={file}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="empty-list">В корзине ничего нет</p>
            )}
        </div>
    );
};

export default StarredPage;
