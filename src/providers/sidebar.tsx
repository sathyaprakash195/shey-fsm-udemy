import { Menu } from "lucide-react";
import React from "react";
import MenuItems from "./menu-items";
import { Drawer } from "antd";

function Sidebar() {
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);
  return (
    <div className="overflow-hidden">
      <div className="flex md:hidden w-full p-2 bg-secondary">
        <Menu
          onClick={() => setShowMobileSidebar(true)}
          size={24}
          className="text-white cursor-pointer"
        />

        <Drawer
          open={showMobileSidebar}
          onClose={() => setShowMobileSidebar(false)}
          placement="left"
        >
          <MenuItems />
        </Drawer>
      </div>

      <div className="hidden md:flex">
        <MenuItems />
      </div>
    </div>
  );
}

export default Sidebar;
