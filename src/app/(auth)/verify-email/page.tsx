"use client";

import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { resendVerificationEmail, getUser } from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";

const Page = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const { user, emailVerificationStatus, emailVerificationError } =
    useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleResendVerificationEmail = async () => {
    if (!user) {
      setError("You need to login to resend verification email");
    } else {
      try {
        dispatch(resendVerificationEmail(user.email));
        setError(emailVerificationError);
      } catch (error: any) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className="mb-4 text-lg tracking-wide text-gray-600">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn&apos;t receive the email, we will gladly send you another.
      </div>

      {emailVerificationStatus === "successful" && (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}
      {/* Display Resend Error If Any  */}

      {error && (
        <div className="mb-4 font-medium text-lg tracking-wide text-error">
          {error}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={() => handleResendVerificationEmail()}>
          Resend Verification Email
        </Button>
      </div>
    </>
  );
};

export default Page;
