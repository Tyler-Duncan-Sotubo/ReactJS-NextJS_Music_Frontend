"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { resetPassword } from "@/redux/slices/authSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordInput } from "../../types";
import { resetPasswordSchema } from "../../schemas";
import TextInput from "@/components/TextInput";

const PasswordReset = () => {
  const dispatch = useAppDispatch();
  const { passwordResetError, passwordResetStatus } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: yupResolver(resetPasswordSchema) as Resolver<
      ResetPasswordInput,
      any
    >,
  });
  const onSubmit = (data: ResetPasswordInput) => {
    // Check if the user has agreed to the terms of service
    const resetData = { ...data, token };
    dispatch(resetPassword(resetData));
    setError(passwordResetError);
  };

  useEffect(() => {
    if (passwordResetStatus === "successful") {
      router.push("/login");
    }
  }, [passwordResetStatus, router]);

  const [error, setError] = useState<string | null>("");
  const { token } = useParams();

  return (
    <>
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
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <TextInput
            register={register}
            name="password"
            error={errors.password?.message}
            id="password"
            type="password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <TextInput
            register={register}
            name="password_confirmation"
            error={errors.password_confirmation?.message}
            id="password_confirmation"
            type="password"
          />
        </div>

        {/* Error Handler  */}
        {passwordResetError?.includes("Token") ? (
          <InputError message={error} className="mt-2" />
        ) : (
          <InputError message={error?.[0]} className="mt-2" />
        )}

        <div className="flex items-center justify-end my-8">
          <Button className="px-8">Reset Password</Button>
        </div>
      </form>
    </>
  );
};

export default PasswordReset;
