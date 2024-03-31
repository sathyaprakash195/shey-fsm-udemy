import PageTitle from "@/components/page-title";
import { getDateTimeFormat } from "@/helpers/formats";
import UserModel from "@/models/user-model";
import TaskModel from "@/models/task-model";
import React from "react";
import { TaskType } from "@/interfaces";
import Link from "next/link";

async function UserInfoPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const userResponse = await UserModel.findById(params.id);
  const user = JSON.parse(JSON.stringify(userResponse));
  if (!user) return <div>User not found</div>;

  const tasksResponse = await TaskModel.find({ user: user._id });
  const tasks = JSON.parse(JSON.stringify(tasksResponse));

  const getProperty = ({ name, value }: { name: string; value: any }) => {
    return (
      <div className="flex flex-col">
        <span className="text-gray-500 text-xs">{name}</span>
        <span className="text-gray-700 font-semibold text-sm">
          {value || "N/A"}
        </span>
      </div>
    );
  };
  return (
    <div>
      <PageTitle title={user.name} />

      <div className="bg-gray-100 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-7 border border-gray-300 border-solid">
        {getProperty({ name: "Name", value: user.name })}
        {getProperty({ name: "Email", value: user.email })}
        {getProperty({ name: "Portfolio", value: user.portfolio })}
        {getProperty({ name: "Id", value: user._id })}
        {getProperty({
          name: "Joined On",
          value: getDateTimeFormat(user.createdAt),
        })}

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h1 className="text-sm text-gray-500">Bio</h1>
          <p className="text-gray-500 text-sm">{user.bio || "N/A"}</p>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h1 className="text-sm text-gray-500">Skills</h1>

          <div className="flex flex-wrap gap-7 mt-2">
            {user.skills.map((skill: string) => (
              <div className="bg-secondary px-2 py-1 text-white text-xs">
                {skill}
              </div>
            ))}

            {user.skills.length === 0 && (
              <div className="text-gray-700 font-semibold text-sm">No skills added</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7">
        <h1 className="text-info text-lg">Tasks Posted by {user.name}</h1>

        {tasks.length === 0 && (
          <div className="text-gray-500 mt-7 text-sm">
            No tasks have been posted by {user.name} yet
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-7">
          {tasks.map((task: TaskType) => (
            <Link href={`/task/${task._id}`} className="no-underline">
              <div className="p-2 bg-gray-100 flex flex-col gap-4 border border-gray-200 border-solid">
                <h1 className="text-secondary text-lg">{task.title}</h1>
                <p className="text-sm text-gray-500">{task.subTitle}</p>

                <div className="flex justify-end">
                  <span className="text-gray-500 text-xs">
                    {getDateTimeFormat(task.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
