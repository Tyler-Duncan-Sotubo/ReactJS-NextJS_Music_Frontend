"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Link from "next/link";
import { useState, useEffect } from "react";
import FormDescription from "../FormDescription";
import { registerUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInput from "@/components/TextInput";
import { IFormInput } from "@/app/(auth)/types";
import { registerSchema } from "@/app/(auth)/schemas";

const Page = () => {
  const [agreeToTerms, setAgreeToTerms] = useState<Boolean>(false);
  const [error, setErrors] = useState<string>("");

  const dispatch = useAppDispatch();
  const { access_token, registerError } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema) as Resolver<IFormInput, any>,
  });

  const onSubmit = (data: IFormInput) => {
    // Check if the user has agreed to the terms of service
    if (!agreeToTerms) {
      setErrors("You must agree to the terms of service");
      return;
    } else {
      setErrors("");
    }
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (access_token) router.push("/dashboard");

    // remove Terms of Service error when user agrees to terms
    if (agreeToTerms) {
      setErrors("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, agreeToTerms]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormDescription
        header="Create An Account"
        path="/login"
        pathText="Log in"
        authQuestion="Already have an account?"
      />

      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <TextInput
          register={register}
          name="name"
          error={errors.name?.message}
          id="name"
          type="text"
        />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <TextInput
          register={register}
          name="email"
          error={errors.email?.message}
          id="email"
          type="email"
        />
      </div>

      {/* Password  */}
      <div className="mt-4 relative">
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
        <Label htmlFor="password_confirmation">Confirm Password</Label>

        <TextInput
          register={register}
          name="password_confirmation"
          error={errors.password_confirmation?.message}
          id="password_confirmation"
          type="password"
        />
      </div>

      {/* Error Handler  */}
      {registerError === "Email already exists" ? (
        <InputError message={registerError} className="mt-2" />
      ) : (
        <InputError message={registerError?.[0]} className="mt-2" />
      )}

      {/* Remember Me */}
      <div className="block mt-8">
        <label htmlFor="agreeToTerms" className="inline-flex items-center">
          <input
            data-testid="agreeToTerms"
            id="agreeToTerms"
            type="checkbox"
            name="agreeToTerms"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(event) => setAgreeToTerms(event.target.checked)}
          />
          <span className="ml-2 text-lg text-blue-600 hover:underline">
            <Link href="/terms" target="_blank">
              <h5>I have read and agree to our terms of service</h5>
            </Link>
          </span>
        </label>
      </div>

      {/* Errors For Terms and Conditions */}
      {errors && <InputError message={error} />}

      {/* Submit Button */}
      <div className="flex items-center justify-end mt-8">
        <Button>Sign Up</Button>
      </div>
    </form>
  );
};

export default Page;
