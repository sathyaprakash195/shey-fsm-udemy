"use client";
import { skillsData } from "@/data/skills";
import { useRouter } from "next/navigation";
import React from "react";

function Skillset() {
  const router = useRouter();
  return (
    <div className="mt-20 flex flex-col">
      <h1 className="text-lg font-semibold text-gray-800">
        Browse by Skillset
      </h1>

      <div className="flex flex-wrap gap-4 mt-5">
        {skillsData.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded text-xs cursor-pointer"
            onClick={() => router.push(`/?query=${skill}`)}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Skillset;
