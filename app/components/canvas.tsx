"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addElement,
  updateElementPosition,
  deleteElement,
  updateElementSize,
} from "../store/builder/builderSlice";
import ElementRenderer from "./elementRenderer";
import EditElement from "./editElement";
import { useState } from "react";
import "react-resizable/css/styles.css";
import { ResizableBox } from "react-resizable";
export default function Canvas() {
  const dispatch = useDispatch();
  const { grid } = useSelector((state: RootState) => state.builder.canvas);
  const elements = useSelector((state: RootState) => state.builder.elements);
  const canvas = useSelector((state: RootState) => state.builder.canvas);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

    dispatch(
      addElement({
        id: crypto.randomUUID(),
        type,
        x: type === "header" ? "0" : type === "footer" ? "0" : x,
        y: type === "header" ? 0 : type === "footer" ? canvas.height - 60 : y,
        width:
          type === "header" || type === "footer"
            ? "100%"
            : type === "card"
            ? 300
            : 400,
        height:
          type === "header"
            ? 80
            : type === "footer"
            ? 60
            : type === "card"
            ? 200
            : 150,
        zIndex:
          type === "header"
            ? 1000
            : type === "footer"
            ? 0
            : elements.length + 1,
        content: {},
      })
    );
  };
  const handleDrag = (e: React.MouseEvent, el: any) => {
    e.stopPropagation();

    if (!el) return;

    const offsetX = e.clientX - el.position.x;
    const offsetY = e.clientY - el.position.y;

    const move = (moveEvent: MouseEvent) => {
      let newX = moveEvent.clientX - offsetX;
      let newY = moveEvent.clientY - offsetY;

      const maxX = canvas.width - el.position.width;
      const maxY = canvas.height - el.position.height;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      const isColliding = elements.some((other) => {
        if (other.id === el.id) return false;

        const A = {
          x: newX,
          y: newY,
          w: el.position.width,
          h: el.position.height,
        };
        const B = {
          x: other.position.x,
          y: other.position.y,
          w: other.position.width,
          h: other.position.height,
        };

        return !(
          A.x + A.w < B.x ||
          A.x > B.x + B.w ||
          A.y + A.h < B.y ||
          A.y > B.y + B.h
        );
      });

      if (isColliding) return;

      dispatch(
        updateElementPosition({
          id: el.id,
          x: newX,
          y: newY,
        })
      );
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };
  const handleDelete = (id: string) => {
    dispatch(deleteElement(id));
  };

  const handleResize = (e: any, data: any, el: any) => {
    const aspect = el.position.width / el.position.height;

    const newWidth = data.size.width;
    const newHeight = Math.round(newWidth / aspect);

    dispatch(
      updateElementSize({
        id: el.id,
        width: newWidth,
        height: newHeight,
      })
    );
  };
  return (
    <div
      className="flex bg-gray-400 relative overflow-hidden"
      style={{
        width: canvas.width,
        height: canvas.height,
      }}
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
          {el.type !== "header" && el.type !== "footer" && (
            <>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => {
                    setSelectedId(el.id);
                    setEditOpen(true);
                  }}
                  className=" hover:cursor-pointer"
                >
                  Edit
                </button>
                <span
                  onMouseDown={(e) => handleDrag(e, el)}
                  className=" hover:cursor-pointer"
                >
                  Taşı
                </span>
                <span
                  onClick={() => handleDelete(el.id)}
                  className=" hover:cursor-pointer"
                >
                  Sil
                </span>
              </div>
            </>
          )}
          {el.type === "header" || el.type === "footer" ? (
            <div
              style={{
                width: el.position.width,
                height: el.position.height,
              }}
            >
              <ElementRenderer element={el} />
            </div>
          ) : (
            <ResizableBox
              width={Number(el.position.width)}
              height={Number(el.position.height)}
              onResize={(e, data) => handleResize(e, data, el)}
              resizeHandles={["se"]}
              lockAspectRatio={false}
              minConstraints={[300, 200]}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <ElementRenderer element={el} />
              </div>
            </ResizableBox>
          )}
        </div>
      ))}
      <EditElement
        open={editOpen}
        onClose={() => setEditOpen(false)}
        elementId={selectedId}
      />
    </div>
  );
}
