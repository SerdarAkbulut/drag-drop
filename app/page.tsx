import Image from "next/image";
import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas";

export default function Home() {
  return (
    <div className="flex h-full  bg-zinc-50 font-sans dark:bg-black ">
      <div className="w-full h-[800px] m-8 border border-gray-300 shadow-lg ">
        <Canvas />
      </div>
      <div className="flex justify-end ">
        <Sidebar />
      </div>
    </div>
  );
}
