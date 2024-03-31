import React from "react";

function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize text-info">{title}</h1>
    </div>
  );
}

export default PageTitle;
