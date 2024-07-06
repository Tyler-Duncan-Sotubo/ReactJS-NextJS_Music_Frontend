"use client";

import { useState, useEffect } from "react";
import { MdClose, MdDashboard, MdGraphicEq, MdLogout } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

import { GiHamburgerMenu } from "react-icons/gi";
import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import ApplicationLogo from "@/components/ApplicationLogo";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slices/labelAuthSlice";

export default function LabelNavigation({ label }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex-row-between w-full px-10 py-4 mx-auto top-0 bg-white absolute"
        id="nav">
        <div className="flex-row-between gap-10">
          <Link href="/label">
            <ApplicationLogo className={"w-14 h-14 text-black fill-current"} />
          </Link>
          <ul className="flex-row-center gap-6">
            {dashboardNav.map((item, index) => (
              <li key={index}>
                <NavLink href={item.href} active={pathname === item.href}>
                  <h5 className="text-black hover:text-blue-700">
                    {item.name}
                  </h5>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {label && (
          <div className="flex gap-10 items-center">
            <div
              className="cursor-pointer ml-1 hover:text-primary"
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}>
              <p className="text-black text-[16px] capitalize font-medium hover:border-primary hover:border-b-2 inline-block py-2">
                logout
              </p>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="relative md:hidden w-full text-primary mt-2 mb-10"
        id="nav">
        <section className="flex justify-between items-center px-5 py-3">
          {/* Logo */}
          <Link href="/label">
            <ApplicationLogo className={"w-10 h-10 text-black fill-current"} />
          </Link>
          <div className="flex items-center gap-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer z-[9998]">
              <GiHamburgerMenu className="text-4xl" />
            </button>
          </div>
        </section>

        {/* Mobile Navigation */}
        <div
          className={`fixed duration-300 bg-white cursor-pointer top-0 z-[9999] h-screen w-[83%]  
        ${isOpen ? "right-0 md:right-16" : "right-[-400px] opacity-0"}`}>
          <div className="flex justify-end py-5 px-5">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer z-[9999] ">
              <MdClose className="text-4xl" />
            </button>
          </div>

          {/* Welcome Message for label */}
          <p className="text-black text-2xl px-10 pb-10">
            Welcome, {label?.name}
          </p>

          {/* Mobile Navigation Links */}
          <ul className="px-10">
            {dashboardNav.map((item, index: any) => {
              return (
                <li
                  key={index}
                  className="flex items-center gap-3 capitalize text-background text-2xl font-regular mt-4"
                  onClick={() => setIsOpen(false)}>
                  <p className="text-4xl">{item.icon}</p>
                  <Link href={item.href}>
                    <h4 className="text-black hover:text-blue-700 text-lg">
                      {item.name}
                    </h4>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Navigation Login Links */}
          {label && (
            <div
              className="cursor-pointer ml-1 hover:text-primary px-9 mt-4"
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}>
              <div className="flex gap-2 items-center">
                <MdLogout size={38} />
                <p className="text-black text-[18px] capitalize py-3">logout</p>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

const dashboardNav = [
  { name: "Dashboard", href: "/label", icon: <MdDashboard /> },
  { name: "Artists", href: "/label/artists", icon: <IoIosPeople /> },
  { name: "Royalties", href: "/label/sales", icon: <MdGraphicEq /> },
  { name: "Payout", href: "/label/payout", icon: <MdDashboard /> },
];
