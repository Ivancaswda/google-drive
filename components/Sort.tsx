// components/Sort.tsx
"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";

interface SortProps {
    sortBy: string;
    onChange: (value: string) => void;
}

const Sort = ({ sortBy, onChange }: SortProps) => {
    return (
        <Select value={sortBy} onValueChange={onChange}>
            <SelectTrigger className="sort-select w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="sort-select-content">
                {sortTypes.map((sort) => (
                    <SelectItem key={sort.label} value={sort.value}>
                        {sort.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default Sort;
