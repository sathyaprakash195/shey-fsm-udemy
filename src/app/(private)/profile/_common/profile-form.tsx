"use client";
import { updateUserInMongoDB } from "@/server-actions/users";
import useUsersStore, { UsersStoreType } from "@/store/users-store";
import { Button, Form, Input, Tag, message } from "antd";
import React, { useState } from "react";

function ProfileForm() {
  const { loggedInUserData, SetLoggedInUserData }: any =
    useUsersStore() as UsersStoreType;
  const [skills, setSkills] = useState<string[]>(
    loggedInUserData?.skills || []
  );
  const [skillsValue, setSkillsValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onAddSkills = () => {
    const newSkills = skillsValue.split(",");
    setSkills([...skills, ...newSkills]);
    setSkillsValue("");
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await updateUserInMongoDB({
        userId: loggedInUserData._id,
        payload: { ...values, skills },
      });
      if (response.success) {
        message.success("Profile updated successfully");
        SetLoggedInUserData(response.data);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rules = [{ required: true, message: "This field is required" }];

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-3 gap-5 mt-7"
      onFinish={onFinish}
      initialValues={loggedInUserData}
    >
      <Form.Item
        label="Name"
        name="name"
        className="col-span-3 md:col-span-1"
        rules={rules}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        className="col-span-3 md:col-span-1"
        rules={rules}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Portfolio"
        name="portfolio"
        className="col-span-3 md:col-span-1"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Bio"
        name="bio"
        className="w-full col-span-3"
        rules={rules}
      >
        <Input.TextArea />
      </Form.Item>

      <div className="col-span-3">
        <span className="text-sm">
          Skills <span className="text-xs">(Separated by commas)</span>
        </span>
        <div className="flex gap-5">
          <Input
            placeholder="Enter your skills"
            value={skillsValue}
            onChange={(e) => setSkillsValue(e.target.value)}
          />
          <Button onClick={onAddSkills}>Add</Button>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          {skills.map((skill, index) => (
            <Tag
              closable
              onClose={() => {
                const newSkills = [...skills];
                newSkills.splice(index, 1);
                setSkills(newSkills);
              }}
              key={index}
              className="px-5 py-2 text-white bg-secondary"
              color="secondary"
            >
              {skill}
            </Tag>
          ))}
        </div>
      </div>

      <div className="col-span-3 flex justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Update
        </Button>
      </div>
    </Form>
  );
}

export default ProfileForm;
