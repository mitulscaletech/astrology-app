"use client";

import { useState, useEffect } from "react";
import { Search } from "@/components/user/astrologer/search-bar";
import { Filters } from "@/components/user/astrologer/filters";
import { AstrologerCard } from "@/components/user/astrologer/astrologer-card";
import type { Astrologer } from "@/shared/interface/index.ts";
import { astrologers } from "@/lib/data";
import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";

export default function AstrologersList() {
  const [allAstrologers, setAllAstrologers] = useState<Astrologer[]>(astrologers);
  const [filteredAstrologers, setFilteredAstrologers] = useState<Astrologer[]>(allAstrologers);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  const getAstoList = async () => {
    const res = await HttpService.get(API_CONFIG.astrologerList);
    console.log("res", res.data);
    if (res.data.length > 0) {
      setAllAstrologers([res.data, ...astrologers]);
    }
  };
  useEffect(() => {
    getAstoList();
  }, []);

  console.log("allAstrologers", allAstrologers);

  // Get unique languages for filter options
  const languages = Array.from(new Set(allAstrologers.flatMap((astrologer) => astrologer.languages)));

  useEffect(() => {
    let result = [...allAstrologers];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((astrologer) => astrologer.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Apply rating filter
    if (ratingFilter !== null) {
      result = result.filter((astrologer) => astrologer.rating >= ratingFilter);
    }

    // Apply language filter
    if (languageFilter && languageFilter !== "all") {
      result = result.filter((astrologer) => astrologer.languages.includes(languageFilter));
    }

    setFilteredAstrologers(result);
  }, [searchQuery, ratingFilter, languageFilter]);

  return (
    <section className="">
      <h1 className="text-3xl font-bold mb-6 text-primary">Astrologers</h1>

      <div className="mb-6">
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="mb-8">
        <Filters
          languages={languages}
          selectedRating={ratingFilter}
          selectedLanguage={languageFilter}
          onRatingChange={setRatingFilter}
          onLanguageChange={setLanguageFilter}
        />
      </div>

      {filteredAstrologers.length === 0 ? (
        <div className="text-center py-12 bg-primary-100 rounded-lg">
          <p className="text-lg">No astrologers found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAstrologers.map((astrologer) => (
            <AstrologerCard key={astrologer.id} astrologer={astrologer} />
          ))}
        </div>
      )}
    </section>
  );
}
