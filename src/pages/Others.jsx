import Navbar from "../components/Navbar";
import {
  FolderIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function OthersPage() {
  const [otherFiles, setOtherFiles] = useState([]); // start empty
  const [sortBy, setSortBy] = useState("date");

  // Sorting
  const sortedFiles = [...otherFiles].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "size") return a.sizeMB - b.sizeMB;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Add file function (called from upload)
  const addOtherFile = (file) => {
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      sizeMB: file.size / (1024 * 1024),
      date: new Date().toISOString(),
      type: "other",
    };
    setOtherFiles((prev) => [newFile, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onFileUpload={addOtherFile} /> {/* hook upload */}
      <main className="flex-1 p-6 bg-secondary overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Others</h1>
            <p className="text-white/80 text-sm">
              Total –{" "}
              {otherFiles.length > 0
                ? `${otherFiles
                    .reduce((sum, f) => sum + (f.sizeMB || 0), 0)
                    .toFixed(1)}MB`
                : "0MB"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-white/90 text-sm">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm border border-primary focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="date">Date Created</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedFiles.map((file) => (
            <div
              key={file.id}
              className="bg-primary/80 rounded-xl p-4 text-white flex flex-col gap-3 hover:bg-primary/90 transition cursor-pointer"
            >
              {/* Icon & Name */}
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <FolderIcon className="h-5 w-5 text-white" />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-medium truncate">{file.name}</h3>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex justify-between text-xs text-white/80 mt-auto">
                <span>{file.size}</span>
                <span>
                  {new Date(file.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Options */}
              <div className="flex justify-end">
                <button className="text-white/60 hover:text-white transition">
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedFiles.length === 0 && (
          <div className="text-center py-10">
            <p className="text-white/60">No files in Others.</p>
          </div>
        )}
      </main>
    </div>
  );
}
