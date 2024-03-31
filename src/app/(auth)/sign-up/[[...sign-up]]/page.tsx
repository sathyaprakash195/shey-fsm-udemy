import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 items-center justify-center min-h-screen">
      <div className="hidden bg-primary h-full w-full rounded-r-3xl md:flex justify-center items-center">
        <div className="text-white">
          <h1 className="text-7xl">F S M</h1>
          <span className="text-xs">One stop solution for freelancers</span>
        </div>
      </div>
      <div className="flex justify-center">
        <SignUp />
      </div>
    </div>
  );
}
