"use client";

import Button from "@/components/Button";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PayoutComponent = () => {
  const pathname = usePathname();
  return (
    <div className="">
      <section
        className={`pt-12 ${
          pathname === "/label/payout" ? "md:pt-36 w-[90%]" : ""
        }  mx-auto py-12`}>
        <h1>Payouts</h1>
        <div className="md:w-[58%] my-10 bg-primary rounded-xl shadow-lg text-white md:p-10 p-8">
          <h1 className="tracking-wide mb-6">
            We just need to confirm your identity.
          </h1>
          <h3 className="mb-8">
            Please complete this quick, one-time identity check. It'll only take
            a few minutes and once you're verified we can start sending
            royalties!
          </h3>
          <Link
            href="https://signup.metamap.com/?merchantToken=6687d820c92872001e30d5a4&flowId=6687d820c92872001e30d5a3"
            target="_blank">
            <Button
              className="bg-white border-primary hover:text-black hover:bg-secondary border-2"
              color="text-black">
              Verify Identity
            </Button>
          </Link>
        </div>

        <div className="p-8 bg-white text-center md:w-[58%] rounded-xl shadow-lg my-10">
          <h2 className="mb-16">Current Balance</h2>
          <h2 className="text-6xl">£0</h2>
        </div>

        <section>
          <h2 className="mb-6">Your History </h2>
          <p>You haven't made any payout request yet.</p>
        </section>
      </section>
    </div>
  );
};

export default PayoutComponent;
