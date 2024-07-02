"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

type Subscriptions = {
  id: string;
  plan: string;
  status: string;
  name: string;
  email: string;
};

interface RenderSubscriptionsListProps {
  subscriptions: Subscriptions[];
  amountToShow: number;
}

const RenderSubscriptionsList = ({
  subscriptions,
  amountToShow,
}: RenderSubscriptionsListProps) => {
  return (
    <div className="my-20">
      <h1 className="text-2xl font-bold text-center my-10">Subscriptions</h1>
      <table className="w-[95%] mx-auto bg-white border border-secondary">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Plan</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions
            .reverse()
            .slice(0, amountToShow)
            .map((subscription: Subscriptions, index: any) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-center">{subscription.name}</td>
                <td className="px-4 py-2 text-center">{subscription.email}</td>
                <td className="px-4 py-2 text-center">{subscription.plan}</td>
                <td className="px-4 py-2 text-center">{subscription.status}</td>
                <td className="px-4 py-2 flex justify-center">
                  <Link href={`/admin/subscription/${subscription.id}`}>
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

export default RenderSubscriptionsList;
