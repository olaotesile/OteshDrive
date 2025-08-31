import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import illustrationImg from "../../assets/Illustration.png";

export default function Sidebar() {
  const location = useLocation();

  const items = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="h-4 w-4" />,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: <DocumentTextIcon className="h-4 w-4" />,
    },
    {
      name: "Media",
      path: "/media",
      icon: <VideoCameraIcon className="h-4 w-4" />,
    },
    {
      name: "Others",
      path: "/others",
      icon: <EllipsisHorizontalIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-52 bg-primary text-white h-screen flex flex-col justify-between p-6">
      {/* Logo & Navigation */}
      <div className="flex-1">
        <h1 className="text-lg font-bold mb-6">
          OteshDrive{" "}
          <span className="text-xs font-normal text-gray-500">
            — Better than Google Drive
          </span>
        </h1>{" "}
        <ul className="space-y-4">
          {" "}
          {/* increased spacing */}
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 text-sm transition ${
                  location.pathname === item.path
                    ? "bg-secondary rounded-full"
                    : "hover:bg-secondary rounded-lg"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Illustration */}
      <div className="mt-6 flex justify-center">
        <img
          src={illustrationImg}
          alt="Illustration"
          className="max-h-32 w-auto object-contain opacity-90 hover:opacity-100 transition"
        />
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 pl-2 mt-6">
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
          OO
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-xs">Ola Otesile</span>
          <span className="text-gray-300 text-[10px]">bootesile@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
