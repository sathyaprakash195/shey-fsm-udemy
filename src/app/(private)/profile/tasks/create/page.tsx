import PageTitle from "@/components/page-title";
import React from "react";
import TaskForm from "./_common/task-form";

function CreateTaskPage() {
  return <div>
    <PageTitle title="Create Task" />

    <TaskForm />
  </div>;
}

export default CreateTaskPage;
