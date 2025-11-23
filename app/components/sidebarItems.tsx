"use client";

import { useState } from "react";

export default function SidebarItem({
  label,
  type,
}: {
  label: string;
  type: string;
}) {
  const [isDragging, setDragging] = useState(false);

  const onDragStart = (e: React.DragEvent) => {
    setDragging(true);
    e.dataTransfer.setData("element-type", type);

    const img = new Image();
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const onDragEnd = () => setDragging(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`p-3 mb-2 text-white rounded select-none ${
        isDragging
          ? "opacity-50 cursor-grabbing bg-gray-700"
          : "cursor-grab bg-gray-800 hover:bg-gray-700"
      }`}
    >
      {label}
    </div>
  );
}
