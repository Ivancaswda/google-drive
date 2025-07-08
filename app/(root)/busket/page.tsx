'use client'
import React, {useEffect, useState} from 'react'
import {getTrashedFiles} from '@/lib/actions/file.actions';
import {Models} from "node-appwrite";

import {Loader2Icon, TrashIcon} from "lucide-react";
import TrashedFileRow from "@/components/TrashedFileRow";

const TrashPage = () => {
    const [loading, setLoading] = useState<boolean>()
    const [trashedFiles, setTrashedFiles] = useState<Models.Document[]>([]);
    useEffect(() => {
        const fetchTrashedFiles = async () => {
            const data = await getTrashedFiles();
            setTrashedFiles(data);
            setLoading(false);
        };

        fetchTrashedFiles();
    }, []);
    if (loading) return <p className="flex flex-col items-center justify-center gap-4 text-center">
        <Loader2Icon className='animate-spin text-blue'/>
        Загружаем файлы в корзине...</p>;

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl">Корзина</h1>
            {trashedFiles.length > 0 ? (
                <div className="overflow-auto rounded-lg border border-gray-200">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Название</th>
                            <th className="px-4 py-3">Владелец</th>
                            <th className="px-4 py-3">Дата удаления</th>
                            <th className="px-4 py-3">Размер</th>
                            <th className="px-4 py-3">Удалить</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-900">
                        {trashedFiles.map((file: Models.Document) => (
                            <TrashedFileRow key={file.$id} file={file}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <img
                        src="https://ssl.gstatic.com/docs/doclist/images/empty_state_trash_v4.svg"
                        alt="No starred files"
                        className="mx-auto mb-4 h-[200px] w-[250px]"
                    />
                    <p className="text-center text-lg ">В корзине пока пусто!</p>
                    <p className="mt-2 text-center text-sm text-gray-600">Удалите какой-нибудь файл чтобы он появился здесь</p>
                </div>
            )}
        </div>
    );
};

export default TrashPage;
