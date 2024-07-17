"use client";

import NavLink from "@/components/NavLink";
import { useState } from "react";
import LoginLinks from "./LoginLinks";
import { navData, mobileNavData, mobileLoginNavData } from "@/data/data";
import { usePathname } from "next/navigation";
import ApplicationLogo from "@/components/ApplicationLogo";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useAppSelector } from "@/redux/hooks/hooks";

type NavigationProps = {
  homeRoute?: string;
};

export default function Navigation({ homeRoute = "/" }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <nav
        className="hidden md:flex-row-between w-full px-10 py-4 mx-auto top-0 bg-white absolute shadow-lg"
        id="nav">
        <div className="flex gap-20">
          <Link href={homeRoute}>
            <ApplicationLogo className={"w-14 h-14 text-black fill-current"} />
          </Link>
          <ul className="flex-row-center gap-6">
            {navData.map((item, index) => (
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
        <LoginLinks />
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="relative shadow-xl md:hidden w-full text-primary"
        id="nav">
        <section className="flex justify-between px-5 py-3">
          <Link href={homeRoute}>
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

          {/* Mobile Navigation Links */}
          <ul className="px-10">
            {mobileNavData.map((item, index: any) => {
              return (
                <li
                  key={index}
                  className=" capitalize text-background text-2xl font-regular mt-4"
                  onClick={() => setIsOpen(false)}>
                  <NavLink href={item.href} active={pathname === item.href}>
                    <h4 className="text-black hover:text-blue-700 text-xl">
                      {item.name}
                    </h4>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Navigation Login Links */}
          {user ? (
            <div className="border-t-2 w-[80%] mx-auto my-14 text-center">
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <h4 className="text-white rounded-xl px-6 py-4 text-xl mt-10 bg-primary ">
                  Dashboard
                </h4>
              </Link>
            </div>
          ) : (
            <ul className="border-t-2 border-dashed w-[80%] mx-auto my-14 ">
              {mobileLoginNavData.map((item, index: any) => {
                return (
                  <li
                    key={index}
                    className=" capitalize text-background text-2xl font-regular mt-3"
                    onClick={() => setIsOpen(false)}>
                    <NavLink href={item.href} active={pathname === item.href}>
                      <h4 className="text-black hover:text-blue-700 text-xl">
                        {item.name}
                      </h4>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
