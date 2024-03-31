import PageTitle from "@/components/page-title";
import React from "react";
import ProfileForm from "./_common/profile-form";

function ProfilePage() {
  return (
    <div>
      <PageTitle title="Profile" />

      <ProfileForm />
    </div>
  );
}

export default ProfilePage;
