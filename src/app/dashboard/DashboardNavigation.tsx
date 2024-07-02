"use client";

import { useState, useEffect } from "react";
import { MdAccountTree, MdLock, MdClose } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import NavLink from "@/components/NavLink";
import { dashboardNav } from "./data/navData";
import { usePathname } from "next/navigation";
import ApplicationLogo from "@/components/ApplicationLogo";
import Link from "next/link";
import { FaUserCircle, FaChevronDown, FaMusic } from "react-icons/fa";
import DropDown from "@/components/DropDown";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slices/authSlice";
import { FaBasketShopping } from "react-icons/fa6";
import { getCartTotal } from "@/redux/slices/cartSlice";

export default function DashboardNavigation({ user }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { cartItem, cartTotalQuantity } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartItem]);

  const RenderCartButton = () => (
    <Link href="/dashboard/cart">
      <button className="relative">
        <FaBasketShopping size={25} />
        <span className="absolute -top-4 -right-5">
          {cartTotalQuantity > 0 ? (
            <span className="bg-primary text-white text-xs px-2.5 py-1.5 rounded-full">
              {cartTotalQuantity}
            </span>
          ) : (
            ""
          )}
        </span>
      </button>
    </Link>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex-row-between w-full px-10 py-4 mx-auto top-0 bg-white absolute"
        id="nav">
        <div className="flex-row-between gap-10">
          <Link href="/">
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

        {/* Dashboard User Nav */}
        <div className="flex items-center gap-8">
          {/* Cart */}
          <RenderCartButton />
          {/* Upload Options */}
          <div className="group relative cursor-pointer z-50">
            <div className="flex items-center gap-1">
              <h4 className="font-bold">Upload</h4>
              <FaChevronDown size={20} color="#1e40af" />
            </div>
            {/* Upload Dropdown */}
            <DropDown data={uploadData} />
          </div>

          {/* User Profile */}
          <div className="group relative cursor-pointer z-50">
            <div className="flex items-center">
              <FaUserCircle size={50} color="#1e40af" />
              <FaChevronDown size={20} color="#1e40af" />
            </div>
            {/* Profile Dropdown */}
            <DropDown
              data={profileData}
              includesLogout
              includesUserDetails
              user={user}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="relative md:hidden w-full text-primary mt-2 mb-10"
        id="nav">
        <section className="flex justify-between items-center px-5 py-3">
          {/* Cart */}
          <RenderCartButton />
          {/* Logo */}
          <Link href="/">
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

          {/* Welcome Message for user */}
          <p className="text-black text-2xl px-10 pb-10">
            Welcome, {user?.name}
          </p>

          {/* Mobile Navigation Links */}
          <ul className="px-10">
            {dashboardNav.map((item, index: any) => {
              return (
                <li
                  key={index}
                  className=" capitalize text-background text-2xl font-regular mt-3"
                  onClick={() => setIsOpen(false)}>
                  <NavLink href={item.href} active={pathname === item.href}>
                    <h4 className="text-black hover:text-blue-700 text-lg">
                      {item.name}
                    </h4>
                  </NavLink>
                </li>
              );
            })}
            {uploadData.map((item, index: any) => {
              return (
                <li
                  key={index}
                  className="capitalize text-background font-regular mt-3"
                  onClick={() => setIsOpen(false)}>
                  <NavLink href={item.href} active={pathname === item.href}>
                    <h4 className="text-black hover:text-blue-700 text-lg">
                      {item.name}
                    </h4>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Navigation Login Links */}

          <ul className="border-t-2 w-[80%] mx-auto my-10">
            {profileData.map((item, index: any) => {
              return (
                <li
                  key={index}
                  className="capitalize text-xl mt-2"
                  onClick={() => setIsOpen(false)}>
                  <NavLink href={item.href} active={pathname === item.href}>
                    <h4 className="text-black text-lg">{item.name}</h4>
                  </NavLink>
                </li>
              );
            })}
            <div
              className="cursor-pointer ml-1 hover:text-primary"
              onClick={() => {
                dispatch(logout({ id: user?.sub }));
                setIsOpen(false);
              }}>
              <h4 className="text-black text-lg capitalize font-medium hover:border-primary hover:border-b-2 inline-block py-3">
                logout
              </h4>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

const profileData = [
  {
    name: "Update Account",
    href: "/dashboard/account",
    icon: <MdAccountTree size={20} />,
  },
  {
    name: "Change Password",
    href: "/forgot-password",
    icon: <MdLock size={20} />,
  },
];

const uploadData = [
  {
    name: "Upload Music",
    href: "/dashboard/music",
    icon: <FaMusic size={20} />,
  },
  {
    name: "Upload Videos",
    href: "/dashboard/videos",
    icon: <BiSolidVideos size={20} />,
  },
];

const agentData = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];
