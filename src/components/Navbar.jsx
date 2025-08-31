"use client";

import { useState } from "react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading:", file.name);
      // TODO: integrate backend upload logic here
      setIsOpen(false);
      setFile(null);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="w-full bg-primary h-12 flex items-center justify-between px-4 shadow-sm">
        {/* Left: Search box */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-0.5 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-white w-64 text-sm"
          />
        </div>

        {/* Right: Upload button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium px-2.5 py-1.5 rounded-full text-sm transition"
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Upload File
            </h2>

            {/* File input */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition">
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-sm text-gray-500"
              >
                {file ? (
                  <span className="text-gray-700 font-medium">{file.name}</span>
                ) : (
                  "Click to select a file or drag & drop"
                )}
              </label>
            </div>

            {/* Upload button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpload}
                disabled={!file}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  file
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
