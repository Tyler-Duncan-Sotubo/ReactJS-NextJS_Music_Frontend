"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { features } from "@/data/data";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import CurrencySelector from "@/components/CurrencySelector";
import { toast } from "react-toastify";

const RenderSubscriptionPage = ({
  userSubscription,
  nairaToDollarsRateToday,
}: any) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Redux
  const { currency } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = async (item: any) => {
    try {
      if (userSubscription.status) {
        toast.error("You Have An Existing Subscription", {
          position: "top-right",
        });
        return router.push("/dashboard");
      } else {
        item.price =
          nairaToDollarsRateToday * item.price_in_naira.replace(/,/g, "");
        item.price = item.price.toFixed(0);
        dispatch(addToCart(item));
        router.push("/dashboard/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isMounted && (
        <section className="mt-32">
          <div className="pb-20">
            <div className="text-center">
              <h1 className="text-4xl my-2">Select your subscription plan</h1>
              <h5>
                Choose a plan that works best for you and your music career
              </h5>
              <Link href="/pricing">
                <h4 className="my-2 text-primary font-bold">Compare plans</h4>
              </Link>
            </div>
            <section className="capitalize flex justify-center gap-4 mt-3">
              <p>selected preferred currency</p>
              <div className="w-16">
                <CurrencySelector />
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10">
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
                  <h3>{feature.plan}</h3>
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
                    <button
                      className={` text-white py-3 ${
                        index === 1 ? "bg-primary" : "bg-black"
                      }`}
                      onClick={() =>
                        handleAddToCart({
                          id: feature.id,
                          product: feature.plan,
                          description: feature.description,
                          price_in_naira: feature.price,
                        })
                      }>
                      <p>Get Started</p>
                    </button>
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
      )}
    </>
  );
};

export default RenderSubscriptionPage;
