// components/TrashedFileRow.tsx
"use client";

import { TrashIcon } from "lucide-react";
import Link from "next/link";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import { deleteFile } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import {usePathname} from "next/navigation";
import ActionDropdown from "@/components/ActionDropdown";

type Props = {
    file: Models.Document;
};

const StarredFileRow = ({ file }: Props) => {

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
        <tr key={file.$id} className="border-t transition hover:bg-gray-50">
            <td className="flex items-center gap-2 px-4 py-3">
                <Thumbnail type={file.type} extension={file.extension} url={file.url} />
                <Link href={file.url} target="_blank" className="hover:underline">
                    {file.name.slice(0, 16)}
                </Link>
            </td>
            <td className="px-4 py-3">
                {file.owner ? (
                    <>
                        <div>{file.owner.fullName}</div>
                        <div className="text-xs text-gray-500">{file.owner.email}</div>
                    </>
                ) : (
                    "—"
                )}
            </td>
            <td className="px-4 py-3">{formatDateToRus(file.$updatedAt || file.$createdAt)}</td>
            <td className="px-4 py-3">{convertFileSize(file.size)}</td>
            <td className="flex items-center justify-center px-4 py-3">
                <ActionDropdown file={file}/>
            </td>
        </tr>
    );
};

export default StarredFileRow;
