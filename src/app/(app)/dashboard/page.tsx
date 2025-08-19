import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-neutral-950">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-neutral-950">
          <Feed />
        </main>
      </div>
    </div>
  );
}
