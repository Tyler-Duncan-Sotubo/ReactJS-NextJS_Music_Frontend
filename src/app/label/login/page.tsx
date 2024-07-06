"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormDescription from "@/app/(auth)/FormDescription";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { labelLogin } from "@/redux/slices/labelAuthSlice";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabelLogin } from "../types";
import TextInput from "@/components/TextInput";
import { LabelLoginSchema } from "../schema";

const Login = () => {
  const router = useRouter();
  // Login State Management with Redux
  const dispatch = useAppDispatch();
  const { label_access_token, loginError } = useAppSelector(
    (state) => state.labelAuth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LabelLogin>({
    resolver: yupResolver(LabelLoginSchema) as Resolver<LabelLogin, any>,
  });

  useEffect(() => {
    if (label_access_token) router.push("/label");
  }, [label_access_token]);

  const onSubmit = (data: LabelLogin) => {
    // Check if the user has agreed to the terms of service
    dispatch(labelLogin(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
        <FormDescription
          header="Welcome Back!"
          path="/"
          pathText=""
          authQuestion="Exclusive Label Access"
        />

        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
          <TextInput
            register={register}
            name="email"
            error={errors.email?.message}
            id="email"
            type="email"
          />
          {loginError?.includes("credentials") && (
            <InputError message={loginError} className="mt-2" />
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <TextInput
            register={register}
            name="password"
            error={errors.password?.message}
            id="name"
            type="password"
          />
          {loginError?.includes("Password") && (
            <InputError message={loginError} className="mt-2" />
          )}
        </div>

        <div className="flex items-center justify-end mt-10 ">
          <Button className="ml-3 px-8">Login</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
