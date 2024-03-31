"use client";
import React, { useState } from "react";
import { Button, Form, Tabs, message } from "antd";
import { useRouter } from "next/navigation";
import Basic from "./basic";
import Description from "./description";
import Attatchments from "./attachments";
import { uploadFileToFirebaseAndReturnUrl } from "@/helpers/media";
import { createNewTask, editTask } from "@/server-actions/tasks";
import useUsersStore, { UsersStoreType } from "@/store/users-store";

const { TabPane } = Tabs;

function TaskForm({
  initialValues = null,
  isEdit = false,
}: {
  initialValues?: any;
  isEdit?: boolean;
}) {
  const [skills, setSkills] = useState<string[]>(
    initialValues?.skillsRequired || []
  );
  const [skillsValue, setSkillsValue] = useState<string>("");
  const [description, setDescription] = useState<string>(
    initialValues?.description || ""
  );
  const [isActive = true, setIsActive] = useState<boolean>(
    initialValues?.isActive
  );
  const [existingAttachments, setExistingAttachments] = useState<any[]>(
    initialValues?.attachments || []
  );
  const [newAttachments, setNewAttachments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { loggedInUserData }: UsersStoreType = useUsersStore() as any;

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      let newAttachmentsWithUrls = [...newAttachments];

      for (let i = 0; i < newAttachmentsWithUrls.length; i++) {
        const file = newAttachmentsWithUrls[i].file;
        const downloadURL = await uploadFileToFirebaseAndReturnUrl(file);
        newAttachmentsWithUrls[i].url = downloadURL;
        delete newAttachmentsWithUrls[i].file;
      }

      values.attachments = [...existingAttachments, ...newAttachmentsWithUrls];
      values.skillsRequired = skills;
      values.description = description;
      values.user = loggedInUserData?._id;
      let response = null;

      if (isEdit) {
        response = await editTask({
          taskId: initialValues._id,
          taskData: values,
        });
      } else {
        response = await createNewTask(values);
      }
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }

      router.push("/profile/tasks");
    } catch (error: any) {
      message.error(error?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 pb-10">
      <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Basic" key="1">
            <Basic
              skills={skills}
              setSkills={setSkills}
              skillsValue={skillsValue}
              setSkillsValue={setSkillsValue}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          </TabPane>
          <TabPane tab="Description" key="2">
            <Description
              description={description}
              setDescription={setDescription}
            />
          </TabPane>
          <TabPane tab="Attatchments" key="3">
            <Attatchments
              newAttachments={newAttachments}
              setNewAttachments={setNewAttachments}
              existingAttachments={existingAttachments}
              setExistingAttachments={setExistingAttachments}
            />
          </TabPane>
        </Tabs>

        <div className="flex justify-end gap-7 mt-7">
          <Button
            onClick={() => {
              router.push("/profile/tasks");
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TaskForm;
