// context/UploadContext.tsx
'use client';

import { createContext, useContext, useState } from "react";

type UploadType = "document" | "video" | "image" | "folder" | null;

interface UploadContextType {
    uploadType: UploadType;
    setUploadType: (type: UploadType) => void;
    isUploaderOpen: boolean;
    setUploaderOpen: (open: boolean) => void;
    isBought: boolean;
    setIsBought: (v: boolean) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
    const [uploadType, setUploadType] = useState<UploadType>(null);
    const [isUploaderOpen, setUploaderOpen] = useState(false);
    const [isBought, setIsBought] = useState(false)
    return (
        <UploadContext.Provider value={{ uploadType, setUploadType, isUploaderOpen, setUploaderOpen, isBought, setIsBought }}>
            {children}
        </UploadContext.Provider>
    );
};

export const useUpload = () => {
    const context = useContext(UploadContext);
    if (!context) throw new Error("useUpload must be used within UploadProvider");
    return context;
};
