"use client";

import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserUpdate } from "../../types";
import { UserUpdateSchema } from "../../schema";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Button from "@/components/Button";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type UpdateUserProps = {
  user: any;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
  const [submitError, setSubmitError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: yupResolver(UserUpdateSchema) as Resolver<UserUpdate, any>,
    defaultValues: {
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      role: user.role,
    },
  });

  const onSubmit = async (data: UserUpdate) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/user/${user.id}`,
      data
    );
    if (res.status === 200) {
      toast.success("User Updated Successfully", {
        position: "top-right",
      });
      router.push("/admin/user");
    } else {
      setSubmitError("User Update Failed");
    }
  };

  return (
    <section className="w-[90%] mx-auto">
      <h1 className="text-center py-10">Update User </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="login-form"
        className="rounded-2xl bg-secondary p-10 ">
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
        <div>
          <Label htmlFor="email">Email</Label>
          <TextInput
            register={register}
            name="email"
            error={errors.email?.message}
            id="email"
            type="email"
          />
        </div>

        {/* Email Verified */}
        <div>
          <Label htmlFor="email_verified">Email Verified</Label>
          <TextInput
            register={register}
            name="email_verified"
            error={errors.email_verified?.message}
            id="email_verified"
            type="text"
          />
        </div>

        {/* Role */}
        <div>
          <Label htmlFor="role">Role</Label>
          <TextInput
            register={register}
            name="role"
            error={errors.role?.message}
            id="role"
            type="text"
          />
        </div>

        {/* Error */}
        {submitError && <InputError message={submitError} />}

        {/* Submit Button */}
        <div className="flex items-center justify-end mt-10 ">
          <Button className="ml-3 px-8">Update</Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateUser;
