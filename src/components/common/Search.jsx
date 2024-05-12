import React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input, Button } from "@material-tailwind/react";

export default function Search({ id, value, handleSearch, handleChange }) {
  return (
    <div className=" mt-1 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full md:w-72 ">
        <Input
          label="Search"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          id={id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Button variant="outlined" size="sm">
          Search
        </Button>
      </div>
    </div>
  );
}
