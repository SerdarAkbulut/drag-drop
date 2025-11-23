import React from "react";
import SidebarItem from "./sidebarItems";

function Sidebar() {
  const elements = [
    { label: "Header", type: "header" },
    { label: "Footer", type: "footer" },
    { label: "Card", type: "card" },
    { label: "Text Content", type: "text-content" },
    { label: "Slider", type: "slider" },
  ];
  return (
    <div className="w-64 bg-gray-900 text-white p-4 h-full ">
      <h2 className="text-xl font-semibold mb-4">Components</h2>

      {elements.map((item) => (
        <SidebarItem key={item.type} label={item.label} type={item.type} />
      ))}
    </div>
  );
}

export default Sidebar;
