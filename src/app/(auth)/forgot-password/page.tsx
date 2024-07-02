"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useState, useEffect } from "react";
import { forgotPassword } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordInput } from "../types";
import { ForgotPasswordSchema } from "../schemas";

const Page = () => {
  const dispatch = useAppDispatch();
  const { passwordResetStatus, passwordResetError } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: yupResolver(ForgotPasswordSchema) as Resolver<
      ForgotPasswordInput,
      any
    >,
  });
  const onSubmit = (data: ForgotPasswordInput) => {
    // Check if the user has agreed to the terms of service
    dispatch(forgotPassword(data));
  };

  const router = useRouter();

  useEffect(() => {
    if (passwordResetStatus === "successful") {
      router.push("/forgot-confirmation");
    }
  }, [passwordResetStatus, dispatch, router]);

  return (
    <>
      <h5 className="py-6 text-gray-600">
        Forgot your password? No problem. Just let us know your email email
        address and we will email you a password reset link that that will allow
        you to choose a new one.
      </h5>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
          <TextInput
            register={register}
            name="email"
            error={errors.email?.message}
            id="name"
            type="email"
          />
          <InputError message={passwordResetError} className="mt-2" />
        </div>

        <div className="flex items-center justify-end my-8">
          <Button className="px-8">Email Password Reset</Button>
        </div>
      </form>
    </>
  );
};

export default Page;
