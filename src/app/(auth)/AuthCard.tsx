"use client";

import { distros } from "@/data/data";
import Image from "next/image";
import Navigation from "../Navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AuthCardProps = Readonly<{
  children: React.ReactNode;
}>;

const AuthCard = ({ children }: AuthCardProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-[url('/img/hero/vevo.jpg')] bg-cover px-4 ${
        pathname === "/login" || pathname === "/forgot-password"
          ? "py-36 md:py-10"
          : "py-10"
      } sm:px-0 min-h-screen flex sm:flex-row flex-col justify-between sm:gap-20 bg-cover sm:justify-center items-center pt-6 sm:pt-0`}>
      <div className="bg-white w-full block sm:hidden">
        <Navigation />
      </div>
      <div className="hidden sm:flex flex-col sm:w-1/2 sm:gap-10">
        <Link href="/" className="flex justify-center">
          <div className="relative w-1/4 h-44">
            <Image
              src="/img/mobilelogo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <h1 className=" text-white font-bold drop-shadow-2xl capitalize">
          The simplest way to sell your music globally. Without hidden fees.
        </h1>
        <div className="flex flex-wrap items-center gap-5">
          {distros.map((distro, index) => (
            <div
              key={index}
              className="hover:scale-125 duration-300 relative w-24 h-12 ml-3">
              <Image
                src={distro.image}
                alt={`logo of ${distro.name}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full sm:max-w-md px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-xl`}>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
