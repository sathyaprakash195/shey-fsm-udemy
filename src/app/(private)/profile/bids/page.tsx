import PageTitle from "@/components/page-title";
import { getBidsPlacedByLoggedInUser } from "@/server-actions/bids";
import React from "react";
import LoggedInUserBidsTable from "./_common/bids-table";

async function BidsPage() {
  const response = await getBidsPlacedByLoggedInUser();
  if (!response.success) {
    return <div>{response.message}</div>;
  }

  const bids = response.data;
  return (
    <div>
      <PageTitle title="Bids Placed" />

      <LoggedInUserBidsTable bids={bids} />
    </div>
  );
}

export default BidsPage;
