"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiltersProps {
  languages: string[];
  selectedRating: number | null;
  selectedLanguage: string | null;
  onRatingChange: (rating: number | null) => void;
  onLanguageChange: (language: string | null) => void;
}

export function Filters({
  languages,
  selectedRating,
  selectedLanguage,
  onRatingChange,
  onLanguageChange
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    onRatingChange(null);
    onLanguageChange(null);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="flex-1">
        <Select value={selectedLanguage || ""} onValueChange={(value) => onLanguageChange(value || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Select
          value={selectedRating?.toString() || ""}
          onValueChange={(value) => onRatingChange(value ? Number(value) : null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any rating</SelectItem>
            <SelectItem value="3">3+ stars</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="5">5 stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="sm:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-primary-200 h-4 w-4 mr-2">
              <IconFilter />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter astrologers by rating and language</SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select value={selectedLanguage || ""} onValueChange={(value) => onLanguageChange(value || null)}>
                  <SelectTrigger className="bg-accent-white border-primary-200">
                    <SelectValue placeholder="Filter by language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <Select
                  value={selectedRating?.toString() || ""}
                  onValueChange={(value) => onRatingChange(value ? Number(value) : null)}
                >
                  <SelectTrigger className="bg-accent-white border-primary-200">
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any rating</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="5">5 stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleReset} variant="outline" className="w-full mt-4 border-primary-200">
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div> */}

      {(selectedRating !== null || selectedLanguage !== null) && (
        <Button onClick={handleReset} className="hidden sm:flex">
          Reset Filters
        </Button>
      )}
    </div>
  );
}
