import PageTitle from "@/components/page-title";
import { getTaskById } from "@/server-actions/tasks";
import React from "react";
import TaskForm from "../../create/_common/task-form";

async function EditTaskPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await getTaskById(params.id);
  const task = response.data;

  return (
    <div>
      <PageTitle title="Edit Task" />
      <TaskForm initialValues={task} isEdit={true} />
    </div>
  );
}

export default EditTaskPage;
