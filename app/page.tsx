import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas";

export default function Home() {
  return (
    <div className="flex h-full  bg-zinc-50 font-sans dark:bg-black gap-5 w-full">
      <div className=" ">
        <Canvas />
      </div>
      <div className="flex justify-end ">
        <Sidebar />
      </div>
    </div>
  );
}
