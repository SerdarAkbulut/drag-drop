"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addElement } from "../store/builder/builderSlice";
import ElementRenderer from "./elementRenderer";

export default function Canvas() {
  const dispatch = useDispatch();
  const { grid } = useSelector((state: RootState) => state.builder.canvas);
  const elements = useSelector((state: RootState) => state.builder.elements);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("element-type");
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (grid.enabled && grid.snap && grid.size) {
      x = Math.round(x / grid.size) * grid.size;
      y = Math.round(y / grid.size) * grid.size;
    }

    const defaults: any = {
      header: { width: 1200, height: 80 },
      footer: { width: 1200, height: 60 },
      card: { width: 300, height: 200 },
      slider: { width: 1200, height: 400 },
      "text-content": { width: 300, height: 100 },
    };

    const size = defaults[type] ?? { width: 200, height: 120 };

    dispatch(
      addElement({
        id: crypto.randomUUID(),
        type,
        x,
        y,
        width: size.width,
        height: size.height,
        zIndex: elements.length + 1,
        content: {},
      })
    );
  };

  return (
    <div
      className="flex bg-gray-400 relative overflow-hidden w-full h-full "
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: el.position.x,
            top: el.position.y,
            width: el.position.width,
            height: el.position.height,
            zIndex: el.position.zIndex,
          }}
        >
          <ElementRenderer element={el} />
        </div>
      ))}
    </div>
  );
}
