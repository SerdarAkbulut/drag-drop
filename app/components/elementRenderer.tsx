"use client";

export default function ElementRenderer({ element }: { element: any }) {
  switch (element.type) {
    case "header":
      return (
        <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold w-full h-full drag-handle">
          Header
        </header>
      );

    case "footer":
      return (
        <footer className="bg-gray-800 text-white p-4 text-center w-full h-full drag-handle">
          Footer
        </footer>
      );

    case "slider":
      return (
        <div className="bg-gray-300 w-full h-full drag-handle">Slider</div>
      );

    case "card":
      return (
        <div className="bg-white shadow-md p-4 rounded border w-full h-full drag-handle">
          <h3 className="text-lg font-bold mb-2">
            {element.content.text || "Card Title"}
          </h3>
          <p className="text-gray-700">Card content</p>
        </div>
      );

    case "text-content":
      return (
        <div className="p-4 w-full h-full drag-handle">
          <p className="text-gray-800">{element.content.text || "Text"}</p>
        </div>
      );

    default:
      return null;
  }
}
