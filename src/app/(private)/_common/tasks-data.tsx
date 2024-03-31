import { getDateTimeFormat } from "@/helpers/formats";
import { TaskType } from "@/interfaces";
import { getAllTasks } from "@/server-actions/tasks";
import Link from "next/link";
import React from "react";

async function TasksData({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query || "";
  const response = await getAllTasks(query as string);
  let tasks: TaskType[] = [];
  if (response.success) {
    tasks = response.data;
  }

  if (tasks.length === 0) {
    return <div className="text-gray-500">No tasks found.</div>;
  }

  return (
    <div className="flex flex-col gap-7">
      {tasks.map((task: TaskType) => (
        <Link
          href={`/task/${task._id}`}
          key={task._id}
          className="no-underline"
        >
          <div className="border p-5 border-solid border-gray-300 flex flex-col gap-4">
            <h1 className="text-lg text-secondary">{task.title}</h1>
            <p className="text-sm text-gray-500">{task.subTitle}</p>

            <div className="flex flex-wrap gap-5">
              {task.skillsRequired.map((skill: string) => (
                <div className="bg-secondary px-2 py-1 text-white text-xs">
                  {skill}
                </div>
              ))}
            </div>

            <div className="flex justify-end text-gray-500 text-xs">
              <span>
                By {task.user.name} on {getDateTimeFormat(task.createdAt)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TasksData;
