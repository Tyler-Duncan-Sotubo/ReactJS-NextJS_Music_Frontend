"use client";

import Button from "@/components/Button";
import { adminLogin } from "@/redux/slices/adminAuthSlice";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdminLoginInput } from "../types";
import { AdminLoginSchema } from "../schema";
import TextInput from "@/components/TextInput";

const Login = () => {
  const router = useRouter();
  // Login State Management with Redux
  const dispatch = useAppDispatch();
  const { admin_access_token, loginError } = useAppSelector(
    (state) => state.adminAuth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    resolver: yupResolver(AdminLoginSchema) as Resolver<AdminLoginInput, any>,
  });

  useEffect(() => {
    if (admin_access_token) router.push("/admin/");
  }, [admin_access_token]);

  const onSubmit = (data: AdminLoginInput) => {
    dispatch(adminLogin(data));
  };

  return (
    <section className="flex flex-col justify-center items-center  w-[80%] mx-auto rounded-2xl bg-white">
      <h2 className="my-14">Login</h2>
      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="login-form"
        className="rounded-2xl bg-secondary p-10 w-1/3">
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

        <div className="flex items-center justify-end mt-10 ">
          <Button className="ml-3 px-8">Login</Button>
        </div>
      </form>
    </section>
  );
};

export default Login;
