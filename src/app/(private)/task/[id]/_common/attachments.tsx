"use client";
import { TaskType } from "@/interfaces";
import React from "react";

function Attachments({ task }: { task: TaskType }) {
  const downloadAttachment = async (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-600">Attachments</h2>

      {task.attachments.length === 0 && (
        <span className="text-gray-500 mt-7 text-sm">No attachments found</span>
      )}

      <div className="flex flex-col gap-5 mt-5">
        {task.attachments.map((attachment) => (
          <div className="flex flex-col gap-2 border border-gray-300 border-solid p-3">
            <span className="text-gray-500">{attachment.name}</span>

            <span
              className="text-blue-500 text-sm cursor-pointer"
              onClick={() => downloadAttachment(attachment.url)}
            >
              Download
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attachments;
