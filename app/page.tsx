import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black gap-5 w-full">
      <div className="flex-1 p-4">
        <Canvas />
      </div>
      <div className="w-64">
        <Sidebar />
      </div>
    </div>
  );
}
