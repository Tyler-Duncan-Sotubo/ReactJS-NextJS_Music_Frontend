"use client";

import { BsFillPatchCheckFill } from "react-icons/bs";
import { features } from "@/data/data";
import { useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";
import CurrencySelector from "./CurrencySelector";

type SubscriptionPlanProps = {
  header?: string;
  nairaToDollarsRateToday: number;
};

const SubscriptionPlan = ({
  header = "",
  nairaToDollarsRateToday = 0,
}: SubscriptionPlanProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { currency } = useAppSelector((state) => state.currency);

  return (
    <section>
      <div className="pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">{header}</h2>
        <section className="capitalize flex justify-center gap-4 my-10">
          <p>selected preferred currency</p>
          <div className="w-16">
            <CurrencySelector />
          </div>
        </section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border px-7 py-6 hover:scale-105 duration-1000 ${
                index === 1 &&
                "bg-gradient-to-r from-backgroundTo from-15% via-black via-30%  to-black to-90%  text-white"
              }`}>
              {index === 1 ? (
                <div className="text-right">
                  <p className=" bg-primary inline-block px-2 py-1 text-[10px]">
                    Popular Plan
                  </p>
                </div>
              ) : (
                <div className="py-3" />
              )}
              <h3 className="capitalize">{feature.plan}</h3>
              <div className="flex my-2 gap-2 items-center">
                {currency === "USD" ? (
                  <h1>
                    $
                    {(
                      nairaToDollarsRateToday *
                      Number(feature.price.replace(/,/g, ""))
                    ).toFixed(0)}
                  </h1>
                ) : (
                  <h1>₦{feature.price}</h1>
                )}
                <p>Per Year</p>
              </div>
              <h6 className="font-light">{feature.description}</h6>
              <div className="flex flex-col my-3">
                {!user?.email ? (
                  <Link href="/login" className="flex flex-col my-3">
                    <button
                      className={` text-white py-3 ${
                        index === 1 ? "bg-primary" : "bg-black"
                      }`}>
                      <p>Get Started</p>
                    </button>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/subscription"
                    className="flex flex-col my-3">
                    <button
                      className={` text-white py-3 ${
                        index === 1 ? "bg-primary" : "bg-black"
                      }`}>
                      <p>Get Started</p>
                    </button>
                  </Link>
                )}
              </div>
              <div className="mt-6">
                <h3 className="font-bold mb-3">Features</h3>
                <ul className="flex flex-col gap-2 mb-10">
                  {feature.features.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <BsFillPatchCheckFill className="text-primary" />
                      <p className="text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlan;
