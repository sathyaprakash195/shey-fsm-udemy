import { getDateTimeFormat } from "@/helpers/formats";
import { BidType } from "@/interfaces";
import { Modal } from "antd";
import React from "react";

function BidInfoModal({
  bid,
  showBidInfoModal,
  setShowBidInfoModal,
}: {
  bid: BidType;
  showBidInfoModal: boolean;
  setShowBidInfoModal: any;
}) {
  const getProperty = ({ name, value }: { name: string; value: any }) => {
    return (
      <div className="flex flex-col">
        <span className="text-gray-500 text-xs">{name}</span>
        <span className="text-gray-700 font-semibold text-sm">{value}</span>
      </div>
    );
  };

  return (
    <Modal
      title="BID INFORMATION"
      closable
      centered
      open={showBidInfoModal}
      onCancel={() => setShowBidInfoModal(false)}
      footer={null}
      width={800}
    >
      <hr className="my-5 border border-solid border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {getProperty({ name: "Task", value: bid.task.title })}
        {getProperty({
          name: "Task Posted On",
          value: getDateTimeFormat(bid.task.createdAt),
        })}
        {getProperty({ name: "Client", value: bid.client.name })}
        {getProperty({ name: "Bid Amount", value: bid.bidAmount })}
        {getProperty({ name: "Estimated Days", value: bid.estimatedDays })}
        {getProperty({
          name: "Bid Placed On",
          value: getDateTimeFormat(bid.createdAt),
        })}

        <div className="md:col-span-2 lg:col-span-3">
          {getProperty({ name: "Message", value: bid.message })}
        </div>
      </div>
    </Modal>
  );
}

export default BidInfoModal;
