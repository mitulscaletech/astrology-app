"use client";
import Typography from "@/components/ui/typography";
import IconChevronRight from "@/shared/icons/chevronRight";
import Link from "next/link";
import SearchBox from "../ui/search-box";
import CustomSelect from "../ui/custom-select";
import { useState } from "react";
import BookSessionWidget from "./book-session-widget";
import IconFilter from "@/shared/icons/filter";
import { cn } from "@/lib/utils";

const poojaOptions = [
  { value: "ganesh", label: "Ganesh Pooja" },
  { value: "lakshmi", label: "Lakshmi Pooja" },
  { value: "saraswati", label: "Saraswati Pooja" },
  { value: "hanuman", label: "Hanuman Pooja" }
];

const LearnCategories = () => {
  const [selected, setSelected] = useState<{ value: string; label: string } | null>(null);
  const [isFilter, setIsFilter] = useState(false);

  const handleIsFilter = () => {
    setIsFilter(!isFilter);
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4 lg:gap-6 2xl:gap-8 md:pe-5 xl:pe-6 2xl:pe-8 3xl:pe-10">
      <div className="flex justify-end gap-2 lg:gap-3 ">
        <div className="flex-1">
          <SearchBox />
        </div>
        <div className="flex-1">
          <CustomSelect
            isMulti={false}
            options={poojaOptions}
            value={selected}
            onChange={(option) => setSelected(option as { value: string; label: string } | null)}
            label="Sort"
          />
        </div>
      </div>
      <Typography variant="div" size="h6" className="font-semibold">
        <div
          className={cn(
            "flex justify-between items-center p-3 lg:p-4 xl:p-5 2xl:p-6  bg-secondary rounded-t-lg xl:rounded-t-xl text-accent-white",
            isFilter ? "" : "rounded-b-lg lg:rounded-b-none"
          )}
        >
          <h3>Categories</h3>
          <button className="size-6 lg:hidden" onClick={handleIsFilter}>
            <IconFilter />
          </button>
        </div>
        <div className={cn(isFilter ? "block" : "hidden lg:block")}>
          {["Topic", "Topic", "Topic", "Topic", "Topic"].map((topic, index) => {
            return (
              <Link
                key={index}
                href=""
                className="group flex hover:text-highlight gap-2 items-center px-3 lg:px-4 xl:px-5 4xl:px-6 py-3 lg:py-4 xl:py-5 3xl:py-6 4xl:py-8 border border-secondary/10 border-t-0 last:rounded-b-lg xl:last:rounded-b-xl"
              >
                <span className="size-5 xl:start-6 group-hover:translate-x-1 transition-all ease-out duration-150">
                  <IconChevronRight />
                </span>
                {topic}
              </Link>
            );
          })}
        </div>
      </Typography>
      <BookSessionWidget />
    </div>
  );
};

export default LearnCategories;
