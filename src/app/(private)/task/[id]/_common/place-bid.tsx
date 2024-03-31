"use client";
import { TaskType } from "@/interfaces";
import { placeBid } from "@/server-actions/bids";
import useUsersStore, { UsersStoreType } from "@/store/users-store";
import { Button, Form, Input, Modal, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function PlaceBid({ task }: { task: TaskType }) {
  const [showPlaceBidModal, setShowPlaceBidModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { loggedInUserData }: UsersStoreType = useUsersStore() as any;
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        task: task._id,
        freelancer: loggedInUserData?._id,
        client: task.user._id,

        // email purpose
        clientEmail: task.user.email,
        taskName: task.title,
        freelancerName: loggedInUserData?.name,
        bidAmount: values.bidAmount,
      };

      const response = await placeBid(payload);
      if (response.success) {
        message.success(response.message);
        router.push("/profile/bids");
        setShowPlaceBidModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Button type="primary" onClick={() => setShowPlaceBidModal(true)}>
          Place Bid
        </Button>
      </div>

      {showPlaceBidModal && (
        <Modal
          open={showPlaceBidModal}
          title="PLACE YOUR BID"
          centered
          closable
          onCancel={() => setShowPlaceBidModal(false)}
          footer={null}
        >
          <hr className="my-5 border border-solid border-gray-300" />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="bidAmount"
              label="Bid Amount"
              rules={[
                { required: true, message: "Please input your bid amount!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="estimatedDays"
              label="Estimated Days to Complete"
              rules={[
                {
                  required: true,
                  message: "Please input your estimated days!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <div className="flex justify-end gap-7">
              <Button
                onClick={() => setShowPlaceBidModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Place Bid
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default PlaceBid;
