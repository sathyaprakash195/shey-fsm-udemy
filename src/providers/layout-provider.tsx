"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";
import { message } from "antd";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import useUsersStore from "@/store/users-store";
import Spinner from "@/components/spinner";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrivate =
    !pathname.includes("sign-in") && !pathname.includes("sign-up");
  const { SetLoggedInUserData, loggedInUserData } = useUsersStore() as any;
  const [loading, setLoading] = useState(false);
  const getLoggedInUserData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        SetLoggedInUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPrivate && !loggedInUserData) {
      getLoggedInUserData();
    }
  }, [pathname]);

  if (!isPrivate) {
    return <>{children}</>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="px-5 py-10 flex-1 overflow-y-scroll">{children}</div>
    </div>
  );
}

export default LayoutProvider;
