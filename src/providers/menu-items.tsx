import { Home, User, AlarmClockCheck, LogOut, List } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import React from "react";
import useUsersStore, { UsersStoreType } from "@/store/users-store";

function MenuItems() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { loggedInUserData } = useUsersStore() as UsersStoreType;
  const { signOut } = useAuth();
  const iconSize = 15;
  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home size={iconSize} />,
      isActive: pathname === "/" || pathname === `/task/${params.id}` || pathname === `/user-info/${params.id}`,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User size={iconSize} />,
      isActive: pathname === "/profile",
    },
    {
      name: "Bids",
      href: "/profile/bids",
      icon: <List size={iconSize} />,
      isActive: pathname === "/profile/bids",
    },
    {
      name: "Tasks",
      href: "/profile/tasks",
      icon: <AlarmClockCheck size={iconSize} />,
      isActive: pathname.includes("/profile/tasks"),
    },
    {
      name: "Logout",
      href: "/logout",
      icon: <LogOut size={iconSize} />,
      isActive: pathname === "/logout",
    },
  ];

  const onLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };
  return (
    <div className="w-64 md:bg-gray-200 md:h-screen p-5">
      <div className="mt-5">
        <h1 className="font-bold text-2xl text-secondary">
          SHEY <b className="text-primary">FSM</b>
        </h1>
        <span className="text-sm">{loggedInUserData?.name}</span>
      </div>

      <div className="mt-20 flex flex-col gap-7">
        {menuItems.map((item, index) => (
          <div
            className={`flex gap-3 items-center cursor-pointer p-3 ${
              item.isActive ? "bg-secondary text-white rounded" : ""
            }`}
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                router.push(item.href);
              }
            }}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
