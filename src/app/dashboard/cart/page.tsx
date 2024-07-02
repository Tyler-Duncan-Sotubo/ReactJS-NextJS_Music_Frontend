"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { clearCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import Button from "@/components/Button";
import PaypalPayment from "@/payments/PaypalPayment";
import { getUser } from "@/redux/slices/authSlice";
import { MdCancel } from "react-icons/md";
import PayStack from "@/payments/PayStack";

const page = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Redux
  const { cartItem } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { currency } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
    dispatch(getUser());
    return () => {
      setIsMounted(false);
    };
  }, []);

  const getPrice = () => {
    return currency === "NGN"
      ? `₦ ${cartItem[0]?.price_in_naira}`
      : `$${cartItem[0]?.price}`;
  };

  return (
    <>
      {cartItem.length > 0 && isMounted ? (
        <section className="md:my-16">
          <h1 className="md:mt-32 mt-16 mb-4">Your Cart</h1>
          <h3>Review your order & subscription details</h3>
          <div>
            <div className="w-full">
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200 text-[14px] uppercase my-12">
                  <thead className="font-regular bg-white uppercase text-purple">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Description</th>
                      <th className="text-left p-4">Actions</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Quantity</th>
                      <th className="text-right p-4">Item Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 capitalize">
                    <tr className="text-xl">
                      <td className="px-4 py-6 whitespace-nowrap font-bold">
                        <p>{cartItem[0]?.product}</p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap font-bold">
                        <p>{cartItem[0]?.description}</p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap font-bold">
                        <button
                          className="bg-error flex gap-2 p-2 items-center rounded-xl text-white text-sm"
                          onClick={() => dispatch(clearCart())}>
                          <MdCancel size={25} />
                          <p>Remove Item</p>
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap font-bold">
                        <p>{getPrice()}</p>
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap font-bold">
                        <p>{cartItem[0]?.cartQuantity}</p>
                      </td>
                      <td className=" py-4 whitespace-nowrap font-bold text-right ">
                        <p>{getPrice()}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="md:hidden text-sm capitalize my-10">
                {mobileView.map((item, index) => (
                  <div className="flex justify-between my-6">
                    <div className="font-bold">{item.name}</div>
                    <div className="font-bold">
                      {item.name === "product" && cartItem[0]?.product}
                      {item.name === "actions" && (
                        <button
                          className="bg-error flex gap-2 p-2 items-center rounded-xl text-white text-sm"
                          onClick={() => dispatch(clearCart())}>
                          <MdCancel size={25} />
                          <p>Remove Item</p>
                        </button>
                      )}
                      {item.name === "price" && <p>{getPrice()}</p>}
                      {item.name === "quantity" && cartItem[0]?.cartQuantity}
                      {item.name === "item total" && <p>{getPrice()}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl">
                <div className="flex justify-end my-4 gap-20 font-bold">
                  <p>Subtotal</p>
                  <p>{getPrice()}</p>
                </div>
                <div className="flex justify-end my-4 gap-20 font-bold">
                  <p>Total</p>
                  <p>{getPrice()}</p>
                </div>
              </div>

              {/* Payment Buttons */}

              <div className="mt-24 md:flex justify-end gap-10">
                {/* PayStack */}
                <div className="md:w-1/4 w-full md:my-0 my-10 ">
                  <PayStack cartItem={cartItem[0]} user={user} />
                </div>
                {/* Paypal */}
                <div className="md:w-1/4 w-full">
                  <PaypalPayment cartItem={cartItem[0]} user={user} />
                </div>
              </div>
              <h5 className="md:text-right my-6 text-center ">
                By making a payment you are agreeing to our
                <Link href="/terms">
                  <span className="mx-1 text-primary font-bold">
                    terms and conditions.
                  </span>
                </Link>
              </h5>
            </div>
          </div>
        </section>
      ) : (
        <section className="my-44 flex flex-col justify-center items-center capitalize">
          <h1>You have nothing in your cart</h1>
          <h3 className="font-medium my-8">
            checkout some of our other great services
          </h3>
          <div className="flex md:flex-row flex-wrap gap-10 justify-center">
            <Link href="/dashboard/music">
              <Button
                className="bg-white border-primary hover:text-white border-2"
                color="text-black">
                New Music Release
              </Button>
            </Link>
            <Link href="/dashboard/subscription">
              <Button
                className="bg-white border-primary hover:text-white border-2"
                color="text-black">
                Subscriptions
              </Button>
            </Link>
            <Link href="/dashboard/videos">
              <Button
                className="bg-white border-primary hover:text-white border-2"
                color="text-black">
                New Video Release
              </Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default page;

const mobileView = [
  { name: "product" },
  { name: "actions" },
  { name: "price" },
  { name: "quantity" },
  { name: "item total" },
];
