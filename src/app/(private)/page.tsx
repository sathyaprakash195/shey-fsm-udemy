import { Suspense } from "react";
import Filters from "./_common/filters";
import HomepageHeader from "./_common/home-page-header";
import Skillset from "./_common/skillset";
import TasksData from "./_common/tasks-data";
import Spinner from "@/components/spinner";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const searchParamsKey = JSON.stringify(searchParams);
  return (
    <div>
      <HomepageHeader />

      <div className="grid md:grid-cols-3 gap-5 mt-7">
        <div className="col-span-2 flex flex-col gap-7">
          <Filters searchParams={searchParams} />
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-96">
                <img src="/spinner.gif" alt="spinner" className="w-20 h-20" />
              </div>
            }
            key={searchParamsKey}
          >
            <TasksData searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="col-span-1">
          <Skillset />
        </div>
      </div>
    </div>
  );
}
