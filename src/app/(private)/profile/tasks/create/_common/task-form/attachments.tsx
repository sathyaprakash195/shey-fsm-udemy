import { Button, Input, Upload } from "antd";
import React from "react";

function Attatchments({
  newAttachments,
  setNewAttachments,
  existingAttachments,
  setExistingAttachments,
}: {
  newAttachments: {
    name: string;
    file: File | null;
    url?: string;
  }[];
  setNewAttachments: (newAttachments: any[]) => void;
  existingAttachments: any[];
  setExistingAttachments: (existingAttachments: any[]) => void;
}) {
  const addAttachmentHandler = () => {
    const tempAttachments = [...newAttachments];
    tempAttachments.push({ name: "", file: null, url: "" });
    setNewAttachments(tempAttachments);
  };

  const attachmentUpdateHandler = (index: number, key: string, value: any) => {
    const tempAttachments: any = [...newAttachments];
    tempAttachments[index][key] = value;
    setNewAttachments(tempAttachments);
  };

  const removeAttachmentHandler = (index: number) => {
    const tempAttachments = [...newAttachments];
    tempAttachments.splice(index, 1);
    setNewAttachments(tempAttachments);
  };

  const removeExistingAttachmentHandler = (index: number) => {
    const tempAttachments = [...existingAttachments];
    tempAttachments.splice(index, 1);
    setExistingAttachments(tempAttachments);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={addAttachmentHandler}>Add Attachment</Button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {newAttachments.map((attachment, index) => (
          <div className="border border-gray-300 border-solid flex flex-col gap-5 p-5 mt-5">
            <Input
              placeholder="Attachment Name"
              value={attachment.name}
              onChange={(e) =>
                attachmentUpdateHandler(index, "name", e.target.value)
              }
            />
            <Upload
              listType="picture-card"
              beforeUpload={(file) => {
                attachmentUpdateHandler(index, "file", file);
                return false;
              }}
              maxCount={1}
            >
              <span className="text-sm text-gray-500">Upload File</span>
            </Upload>

            <Button onClick={() => removeAttachmentHandler(index)}>
              Remove
            </Button>
          </div>
        ))}

        {existingAttachments.map((attachment, index) => (
          <div className="border border-gray-300 border-solid flex flex-col gap-5 p-5 mt-5">
            <Input
              placeholder="Attachment Name"
              value={attachment.name}
              disabled
            />
            <Upload
              listType="picture-card"
              fileList={[
                {
                  uid: attachment.name,
                  name: attachment.name,
                  status: "done",
                  url: attachment.url,
                },
              ]}
              maxCount={1}
              disabled
            ></Upload>

            <Button
              onClick={() => {
                removeExistingAttachmentHandler(index);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attatchments;
