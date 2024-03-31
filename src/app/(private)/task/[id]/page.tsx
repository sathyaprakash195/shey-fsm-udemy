import { getDateTimeFormat } from "@/helpers/formats";
import { getTaskById } from "@/server-actions/tasks";
import parse from "html-react-parser";
import React from "react";
import Attachments from "./_common/attachments";
import PlaceBid from "./_common/place-bid";

async function TaskInfoPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const taskResponse = await getTaskById(params.id);
  if (!taskResponse.success) {
    return <div>Task not found</div>;
  }

  const task = taskResponse.data;
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-secondary">{task.title}</h1>
        <span className="text-gray-500 text-xs">
          By {task.user.name} on {getDateTimeFormat(task.createdAt)}
        </span>

        <div className="flex flex-wrap gap-5">
          {task.skillsRequired.map((skill: string) => (
            <div className="bg-gray-200 px-2 py-1 text-black text-xs">
              {skill}
            </div>
          ))}
        </div>
      </div>

      <hr className="my-5 border border-solid border-gray-300" />

      <div className="text-sm">{parse(task.description)}</div>

      <hr className="my-5 border border-solid border-gray-300" />

      <Attachments task={task} />

      <hr className="my-5 border border-solid border-gray-300" />

      <PlaceBid task={task} />
    </div>
  );
}

export default TaskInfoPage;
