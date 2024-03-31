"use client";
import { Button } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function LinkButton({
  title = "primary",
  path,
  type,
}: {
  title: string;
  path: string;
  type: "link" | "text" | "default" | "primary" | "dashed";
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(path);
      }}
      type={type}
    >
      {title}
    </Button>
  );
}

export default LinkButton;
