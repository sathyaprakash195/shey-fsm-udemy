"use client";
import { Button, Input } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function Filters({ searchParams }: { searchParams: { query: string } }) {
  const [query, setQuery] = React.useState<string>(searchParams.query || "");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/?query=${query}`);
  };

  return (
    <div>
      <div className="flex gap-5">
        <Input
          placeholder="Search Tasks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="mt-5 flex gap-5">
        {searchParams.query && (
          <>
            <span className="text-gray-500 text-sm">
              Results for <strong>{searchParams.query}</strong>
            </span>

            <span
              className="text-red-700 cursor-pointer underline text-sm"
              onClick={() => {
                setQuery("");
                router.push("/");
              }}
            >
              Clear
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Filters;
