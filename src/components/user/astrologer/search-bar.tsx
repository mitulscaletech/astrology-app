"use client";

import { Input } from "@/components/ui/input";
import IconSearch from "@/shared/icons/search";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function Search({ value, onChange }: SearchProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5">
        <IconSearch />
      </span>
      <Input
        type="text"
        placeholder="Search astrologers by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
