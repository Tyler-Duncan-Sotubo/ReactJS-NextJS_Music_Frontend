"use client";

import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useState } from "react";

type CartItem = {
  cartItem: any;
  user: any;
};

interface cartItem {
  product: string;
  price: number;
  description: string;
  customerID: string;
}

const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const PaypalPayment = ({ cartItem, user }: CartItem) => {
  // router
  const router = useRouter();
  const [paymentError, setPaymentError] = useState<string>("");

  const createOrder = async () => {
    try {
      const response = await fetch(`${serverURL}paypal/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: cartItem.product,
          price: Number(cartItem.price),
          description: cartItem.description,
          customerID: user.name,
        }),
      });

      const orderData = await response.json();
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error: any) {
      setPaymentError(error);
    }
  };

  const onApprove = async (data: any) => {
    try {
      const res = await fetch(`${serverURL}paypal/capture-transaction`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      const result = await res.json();
      if (result.status === "COMPLETED") {
        await axios.post("api/user/subscription", {
          subscriptionPlan: cartItem.product,
          userId: user.sub,
        });
        router.push("/dashboard/success");
      }
    } catch (error: any) {
      setPaymentError(error);
    }
  };

  return (
    <>
      <PayPalButtons
        createOrder={() => createOrder()}
        onApprove={(data) => onApprove(data)}
        fundingSource={FUNDING.PAYPAL}
      />
    </>
  );
};

export default PaypalPayment;
