import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="p-6 flex-1 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Dashboard content goes here */}
      </div>
    </div>
  );
}
