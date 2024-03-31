"use client";
import useUsersStore, { UsersStoreType } from "@/store/users-store";
import React from "react";

function HomepageHeader() {
  const { loggedInUserData } = useUsersStore() as UsersStoreType;
  return (
    <div className="w-full">
      <h1 className="text-info font-bold text-2xl">
        Welcome {loggedInUserData?.name}!
      </h1>
      <span className="text-sm">Here are the latest tasks...</span>
    </div>
  );
}

export default HomepageHeader;
