"use client";

import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { resendEmail } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ForgotConfirmation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { passwordResetStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (passwordResetStatus === "pending") {
      router.push("/forgot-password");
    }
  }, [passwordResetStatus, dispatch, router]);

  return (
    <>
      <h3 className="text-black font-bold">Please check your email</h3>
      <h4 className="py-4 text-black">
        An email with instructions to create your password has been sent to your
        email. You may need to wait a few minutes to receive the email, or check
        your spam or junk folders. Didn&apos;t get an email?
      </h4>

      <div className="flex items-center justify-end my-8">
        <Button className="px-8" onClick={() => dispatch(resendEmail())}>
          Resend Email
        </Button>
      </div>
    </>
  );
};

export default ForgotConfirmation;
