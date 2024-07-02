"use client";

import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slices/authSlice";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { User } from "@/app/dashboard/types/user.types";

type DropDownProps = {
  data: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[];
  includesLogout?: boolean;
  includesUserDetails?: boolean;
  user?: User;
};

const DropDown = ({
  data,
  includesLogout = false,
  includesUserDetails = false,
  user,
}: DropDownProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="hidden group-hover:block absolute right-0 top-3/4 bg-white shadow-md rounded-2xl p-3 w-[250px]">
      {includesUserDetails && (
        <div className="flex items-center gap-2 mb-6">
          <FaUserCircle size={50} color="#1e40af" />
          <span className="font-bold">{user?.name}</span>
        </div>
      )}
      <ul className="flex gap-2 flex-col my-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-secondary rounded-lg py-2 px-3 opacity-85">
            <Link href={item.href}>
              <div className="flex items-center gap-2">
                {item.icon}
                <h5>{item.name}</h5>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {includesLogout && (
        <div
          className="flex cursor-pointer items-center gap-2 hover:bg-secondary rounded-lg py-2 px-3"
          onClick={() => dispatch(logout({ id: user?.sub }))}>
          <MdLogout size={20} />
          <h5>Logout</h5>
        </div>
      )}
    </div>
  );
};

export default DropDown;
