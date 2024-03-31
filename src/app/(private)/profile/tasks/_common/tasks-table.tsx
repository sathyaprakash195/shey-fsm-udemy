"use client";
import { getDateFormat, getDateTimeFormat } from "@/helpers/formats";
import { TaskType } from "@/interfaces";
import { Table, message } from "antd";
import { Edit, Edit2, EyeIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTask } from "@/server-actions/tasks";
import BidsReceivedModal from "./bids-received-modal";

function TasksTable({ tasks }: { tasks: TaskType[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTask = tasks[0], setSelectedTask] = useState<TaskType | null>(
    null
  );
  const [showBidsReceivedModal, setShowBidsReceivedModal] =
    useState<boolean>(false);
  const deleteTaskHandler = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteTask(id);
      if (response.success) message.success("Task deleted successfully");
      else message.error("Failed to delete task");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "Last Date To Place Bid",
      dataIndex: "lastDateToPlaceBid",
      key: "lastDateToPlaceBid",
      render: (text: string) => getDateFormat(text),
    },
    {
      title: "Bids Received",
      dataIndex: "bidsReceived",
      key: "bidsReceived",
      render: (text: any, record: TaskType) => {
        if (record.bidsReceived === 0) {
          return 0;
        }

        return (
          <div className="flex gap-2 items-center">
            <span>{record.bidsReceived}</span>
            <EyeIcon
              onClick={() => {
                setSelectedTask(record);
                setShowBidsReceivedModal(true);
              }}
              size={20}
              className="cursor-pointer text-blue-700"
            />
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (value: boolean) =>
        value ? (
          <span className="bg-green-700 px-2 py-1 text-white rounded-sm">
            Active
          </span>
        ) : (
          <span className="bg-red-700 px-2 py-1 text-white rounded-sm">
            Inactive
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: TaskType) => (
        <div className="flex gap-5">
          <Trash2
            size={20}
            className="cursor-pointer text-red-700"
            onClick={() => deleteTaskHandler(record._id)}
          />
          <Edit
            size={20}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/profile/tasks/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table loading={loading} dataSource={tasks} columns={columns} />

      {selectedTask && showBidsReceivedModal && (
        <BidsReceivedModal
          task={selectedTask}
          showBidsReceivedModal={showBidsReceivedModal}
          setShowBidsReceivedModal={setShowBidsReceivedModal}
        />
      )}
    </div>
  );
}

export default TasksTable;
