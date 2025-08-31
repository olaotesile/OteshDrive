import Navbar from "../components/Navbar";
import {
  PhotoIcon,
  VideoCameraIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const getMediaIcon = (type) => {
  switch (type) {
    case "image":
      return PhotoIcon;
    case "video":
      return VideoCameraIcon;
    default:
      return PhotoIcon;
  }
};

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState([]); // start empty
  const [sortBy, setSortBy] = useState("date");

  // Sorting
  const sortedFiles = [...mediaFiles].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "size") return a.sizeMB - b.sizeMB;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Add file function (called from upload)
  const addMediaFile = (file) => {
    const type = file.type.startsWith("video") ? "video" : "image";
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      sizeMB: file.size / (1024 * 1024),
      date: new Date().toISOString(),
      type,
    };
    setMediaFiles((prev) => [newFile, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onFileUpload={addMediaFile} /> {/* hook upload */}
      <main className="flex-1 p-6 bg-secondary overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Media</h1>
            <p className="text-white/80 text-sm">
              Total –{" "}
              {mediaFiles.length > 0
                ? `${mediaFiles
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

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedFiles.map((file) => {
            const Icon = getMediaIcon(file.type);
            return (
              <div
                key={file.id}
                className="bg-primary/80 rounded-xl p-4 text-white flex flex-col gap-3 hover:bg-primary/90 transition cursor-pointer"
              >
                {/* Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm font-medium truncate">
                      {file.name}
                    </h3>
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
            );
          })}
        </div>

        {/* Empty State */}
        {sortedFiles.length === 0 && (
          <div className="text-center py-10">
            <p className="text-white/60">No media uploaded yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
