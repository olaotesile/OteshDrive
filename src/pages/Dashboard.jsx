"use client";

import Navbar from "../components/Navbar";
import {
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  FolderIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  // ✅ Just use static values — no state needed yet
  const totalStorage = 500;
  // const usedStorage = 0; // No files → 0GB used

  const hasFiles = false; // No uploads yet


  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="flex flex-1 p-6 gap-6 bg-secondary">
        {/* Left Panel */}
        <div className="flex flex-col flex-1 gap-6">
          {/* Storage Card */}
          <div className="bg-primary rounded-xl p-6 h-1/3 flex items-center gap-6 text-white">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-700"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
                <circle
                  className="text-blue-400"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                  strokeDasharray="0 100"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                0%
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Available Storage</h2>
              <p className="text-sm text-white/80">
                <span className="font-medium">0GB</span> used of {totalStorage}
                GB
              </p>
              <div className="mt-1.5 w-48 bg-gray-700 rounded-full h-1">
                <div
                  className="bg-blue-400 h-1 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {["Documents", "Images", "Media", "Others"].map((name) => {
              let Icon = FolderIcon;
              if (name === "Documents") Icon = DocumentTextIcon;
              if (name === "Images") Icon = PhotoIcon;
              if (name === "Media") Icon = VideoCameraIcon;

              return (
                <div
                  key={name}
                  className="bg-primary/80 rounded-xl p-4 flex flex-col justify-between text-white"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{name}</span>
                    <span className="text-sm">0.0</span>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xs text-white/70">
                      No files yet
                      <br />—
                    </span>
                    <div className="bg-indigo-600 p-2 rounded-lg opacity-80">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Recent Uploads */}
        <div className="w-72 bg-primary/80 rounded-xl p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold text-sm">Recent Uploads</h2>
            <button
              disabled
              className="text-gray-500 text-xs cursor-not-allowed"
            >
              View All
            </button>
          </div>

          {!hasFiles ? (
            <div className="text-center py-8">
              <FolderIcon className="h-8 w-8 text-white/40 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No file uploads yet</p>
              <p className="text-white/40 text-xs mt-1">
                Your files will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {/* Will show real files later */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
