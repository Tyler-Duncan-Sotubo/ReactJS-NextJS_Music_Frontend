"use client";

import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

type CartItem = {
  cartItem: any;
  user: any;
};

const PayStack = ({ cartItem, user }: CartItem) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const amount = cartItem.price_in_naira.replace(/,/g, "") * 100;
  const router = useRouter();

  const componentProps = {
    email: user.email,
    amount,
    metadata: {
      name: user.name,
      custom_fields: [], // Add the missing custom_fields property
    },
    publicKey,
    text: `Pay with Paystack`,
    onSuccess: () => {
      axios.post("api/user/subscription", {
        subscriptionPlan: cartItem.product,
        userId: user.sub,
      });
      router.push("/dashboard/success");
    },
    onClose: () => {},
  };

  return (
    <button className="bg-primary hover:bg-primaryHover text-white text-center font-bold w-full py-3 px-2 rounded-md ">
      <PaystackButton {...componentProps} publicKey={publicKey ?? ""} />
    </button>
  );
};

export default PayStack;
