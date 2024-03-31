"use client";
import { getDateTimeFormat } from "@/helpers/formats";
import { BidType, TaskType, UserType } from "@/interfaces";
import { Table, message } from "antd";
import { EyeIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";
import BidInfoModal from "./bid-info-modal";
import { deleteBid } from "@/server-actions/bids";

function LoggedInUserBidsTable({ bids }: { bids: BidType[] }) {
  const [showBidInfoModal, setShowBidInfoModal] = React.useState(false);
  const [selectedBid, setSelectedBid] = React.useState<BidType | null>(null);
  const [loading, setLoading] = useState(false);

  const onDelete = async (bidId: string) => {
    try {
      setLoading(true);
      const response = await deleteBid(bidId);
      if (response.success) {
        message.success("Bid deleted succesfully");
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text: TaskType) => text.title,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (text: UserType) => text.name,
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
      key: "bidAmount",
    },
    {
      title: "Estimated Days",
      dataIndex: "estimatedDays",
      key: "estimatedDays",
    },
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: BidType) => (
        <div className="flex gap-5">
          <EyeIcon
            className="cursor-pointer text-blue-500"
            size={20}
            onClick={() => {
              setSelectedBid(record);
              setShowBidInfoModal(true);
            }}
          />
          <Trash2 size={20} className="cursor-pointer text-red-500" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        loading={loading}
        dataSource={bids}
        columns={columns}
        rowKey="_id"
      />

      {showBidInfoModal && selectedBid && (
        <BidInfoModal
          bid={selectedBid}
          showBidInfoModal={showBidInfoModal}
          setShowBidInfoModal={setShowBidInfoModal}
        />
      )}
    </div>
  );
}

export default LoggedInUserBidsTable;
