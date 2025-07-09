"use client";

import React, { useCallback, useState } from "react";
import { useUpload } from "@/context/UploadContext";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
    const { uploadType, isUploaderOpen, setUploaderOpen } = useUpload();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );

          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  if (isUploaderOpen) {
      return <div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-xl bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">Загрузка: {uploadType}</h2>

              {/* uploader */}
              <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} accept={getAcceptedTypes(uploadType)}/>
                  <Button type="button" className={cn("uploader-button flex items-center justify-center mx-auto", className)}>
                      <Image src="/assets/icons/upload.svg" alt="upload" width={24} height={24}/>
                      <p>Загрузить</p>
                  </Button>
              </div>

              {/* Preview */}
              {files.length > 0 && (
                  <ul className="uploader-preview-list mt-4">
                      <h4 className="h4 text-light-100">Загрузка</h4>
                      {files.map((file, index) => {
                          const {type, extension} = getFileType(file.name);
                          return (
                              <li key={`${file.name}-${index}`} className="uploader-preview-item">
                                  <div className="flex items-center gap-3">
                                      <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)}/>
                                      <div className="preview-item-name">
                                          {file.name}
                                          <Image src="/assets/icons/file-loader.gif" width={80} height={26}
                                                 alt="Loader"/>
                                      </div>
                                  </div>
                                  <Image
                                      src="/assets/icons/remove.svg"
                                      width={24}
                                      height={24}
                                      alt="Remove"
                                      onClick={(e) => handleRemoveFile(e, file.name)}
                                  />
                              </li>
                          );
                      })}
                  </ul>
              )}
              <Button variant="outline" onClick={() => setUploaderOpen(false)} className="mt-4 w-full">
                  Отмена
              </Button>
          </div>
      </div>
  }

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Button type="button" className={cn("uploader-button", className)}>
                <Image
                    src="/assets/icons/upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                />{" "}
                <p>Загрузить</p>
            </Button>
            {files.length > 0 && (
                <ul className="uploader-preview-list">
                    <h4 className="h4 text-light-100">Uploading</h4>

                    {files.map((file, index) => {
                        const {type, extension} = getFileType(file.name);

                        return (
                            <li
                                key={`${file.name}-${index}`}
                                className="uploader-preview-item"
                            >
                                <div className="flex items-center gap-3">
                                    <Thumbnail
                                        type={type}
                                        extension={extension}
                                        url={convertFileToUrl(file)}
                                    />

                                    <div className="preview-item-name">
                                        {file.name}
                                        <Image
                                            src="/assets/icons/file-loader.gif"
                                            width={80}
                                            height={26}
                                            alt="Loader"
                                        />
                                    </div>
                                </div>

                                <Image
                                    src="/assets/icons/remove.svg"
                                    width={24}
                                    height={24}
                                    alt="Remove"
                                    onClick={(e) => handleRemoveFile(e, file.name)}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    )
};

function getAcceptedTypes(type: string | null) {
    switch (type) {
        case "image":
            return "image/*";
        case "video":
            return "video/*";
        case "document":
            return ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx";
        case "folder":
            return ""; // `webkitdirectory`
        default:
            return "*/*";
    }
}

export default FileUploader;
