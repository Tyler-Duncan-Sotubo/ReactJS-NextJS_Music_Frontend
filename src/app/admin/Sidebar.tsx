import ApplicationLogo from "@/components/ApplicationLogo";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdAudioFile, MdSwitchAccount } from "react-icons/md";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";

type sideBarProps = {
  setIsSidebarCollapsed: (any: boolean) => void;
  isSidebarCollapsed: boolean;
};

const Sidebar = ({
  setIsSidebarCollapsed,
  isSidebarCollapsed,
}: sideBarProps) => {
  return (
    <nav className="py-8 shadow-xl h-screen flex flex-col justify-between ">
      <div className="w-[90%] mx-auto">
        <Link href="/admin">
          {isSidebarCollapsed ? (
            <Image
              src="/img/mobilelogo.png"
              alt="logo"
              width={60}
              height={40}
              className=""
            />
          ) : (
            <ApplicationLogo className={"w-12 h-10 text-black fill-current"} />
          )}
        </Link>
        <ul className="mt-16 w-[90%] mx-auto">
          {navData.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <div className="flex items-center gap-3 text-black hover:text-blue-700 mt-4 px-3">
                  <h4 className="text-3xl"> {item.icon}</h4>
                  {isSidebarCollapsed ? null : (
                    <h4 className="text-lg">{item.name}</h4>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="flex justify-end items-center mt-10 px-2"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
        {isSidebarCollapsed ? (
          <TbLayoutSidebarLeftExpand className="text-3xl" />
        ) : (
          <TbLayoutSidebarRightExpand className="text-3xl" />
        )}
      </button>
    </nav>
  );
};

export default Sidebar;

const navData = [
  { name: "Home", href: "/admin", icon: <FaHome /> },
  { name: "User", href: "/admin/user", icon: <FaUserFriends /> },
  { name: "Audio", href: "/admin/audio", icon: <MdAudioFile /> },
  {
    name: "Subscriptions",
    href: "/admin/subscription",
    icon: <MdSwitchAccount />,
  },
];
