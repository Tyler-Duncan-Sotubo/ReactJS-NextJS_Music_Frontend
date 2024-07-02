"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormDescription from "@/app/(auth)/FormDescription";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { login } from "@/redux/slices/authSlice";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginInput } from "../types";
import { LoginSchema } from "../schemas";
import TextInput from "@/components/TextInput";

const Login = () => {
  const router = useRouter();
  // Login State Management with Redux
  const dispatch = useAppDispatch();
  const { access_token, loginError } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(LoginSchema) as Resolver<LoginInput, any>,
  });

  useEffect(() => {
    if (access_token) router.push("/dashboard");
  }, [access_token]);

  const onSubmit = (data: LoginInput) => {
    // Check if the user has agreed to the terms of service
    dispatch(login(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
        <FormDescription
          header="Welcome Back!"
          path="/register"
          pathText="Sign Up"
          authQuestion="New user?"
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
          {loginError?.includes("Email") && (
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

        {/* Remember Me */}
        <div className="flex items-center justify-between mt-6">
          <label
            htmlFor="remember_me"
            className="inline-flex items-center"
            data-testid="remember me">
            <input
              id="remember_me"
              type="checkbox"
              {...register("shouldRemember")}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-lg text-gray-600">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-lg text-blue-800 hover:text-gray-900 hover:underline ">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-end mt-10 ">
          <Button className="ml-3 px-8">Login</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
