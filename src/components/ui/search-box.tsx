import * as React from "react";
import { Input } from "@/components/ui/input";
import IconSearch from "@/shared/icons/search";

const SearchBox = () => {
  return (
    <div className="w-full relative">
      <Input placeholder="Search" className="ps-12" />
      <span className="absolute size-6 start-5 top-1/2 -translate-y-1/2">
        <IconSearch />
      </span>
    </div>
  );
};

export default SearchBox;
