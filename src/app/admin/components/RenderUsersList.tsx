"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

interface RenderUsersListProps {
  users: any[];
  amountToShow: number;
}

const RenderUsersList = ({ users, amountToShow }: RenderUsersListProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">Users</h1>

      <table className="w-[95%] mx-auto bg-white border border-secondary">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Email Verified</th>
            <th className="px-4 py-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, amountToShow).map((user: any, index: any) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 text-center">{user.name}</td>
              <td className="px-4 py-2 text-center">{user.email}</td>
              <td className="px-4 py-2 text-center">
                {user.email_verified.toString()}
              </td>

              <td className="px-4 py-2 flex justify-center">
                <Link href={`/admin/user/${user.id}`}>
                  <td className="px-4 py-2 flex justify-center">
                    <FaEdit />
                  </td>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RenderUsersList;
