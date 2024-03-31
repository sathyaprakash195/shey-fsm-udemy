import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import { getTasksPostedByLoggedInUser } from "@/server-actions/tasks";
import React from "react";
import TasksTable from "./_common/tasks-table";

async function TasksPage() {
  const tasks = await getTasksPostedByLoggedInUser();
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Tasks" />
        <LinkButton
          title="Create Task"
          path="/profile/tasks/create"
          type="primary"
        />
      </div>

      <TasksTable tasks={tasks.data} />
    </div>
  );
}

export default TasksPage;
