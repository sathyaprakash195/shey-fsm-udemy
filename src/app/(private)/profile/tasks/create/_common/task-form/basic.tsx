import React from "react";
import { Button, Form, Input, Switch, Tag } from "antd";

function Basic({
  skills,
  setSkills,
  skillsValue,
  setSkillsValue,
  isActive,
  setIsActive,
}: {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  skillsValue: string;
  setSkillsValue: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onAddSkills = () => {
    const newSkills = skillsValue.split(",");
    setSkills([...skills, ...newSkills]);
    setSkillsValue("");
  };

  return (
    <div>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="subTitle"
        label="Sub Title"
        rules={[{ required: true, message: "Please input your sub title!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="lastDateToPlaceBid"
        label="Last Date to Place Bid"
        rules={[
          { required: true, message: "Please input last date to place bid!" },
        ]}
      >
        <Input type="date" />
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

      <div className="flex gap-5 items-center mt-7">
        <span className="text-sm">
          Is Active ?{" "}
          <span className="text-xs text-gray-500">(Switch to activate/deactivate) </span>
        </span>
        <Switch
          checked={isActive}
          defaultChecked={isActive}
          onChange={setIsActive}
        />
      </div>
    </div>
  );
}

export default Basic;
