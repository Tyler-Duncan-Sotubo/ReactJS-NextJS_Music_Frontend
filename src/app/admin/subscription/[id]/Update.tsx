"use client";

import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubscriptionUpdate } from "../../types";
import { SubscriptionUpdateSchema } from "../../schema";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Button from "@/components/Button";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Subscription = {
  id: string;
  plan: string;
  status: string;
};

type Props = {
  subscription: Subscription;
};

const Update = ({ subscription }: Props) => {
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionUpdate>({
    resolver: yupResolver(SubscriptionUpdateSchema) as Resolver<
      SubscriptionUpdate,
      any
    >,
    defaultValues: {
      status: subscription.status,
      plan: subscription.plan,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: SubscriptionUpdate) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/subscription/${subscription.id}`,
      data
    );
    if (res.status === 200) {
      toast.success("Subscription Updated Successfully", {
        position: "top-right",
      });
      router.push("/admin/subscription");
    } else {
      setSubmitError("Subscription Update Failed");
    }
  };

  return (
    <section className="w-[90%] mx-auto">
      <h1 className="text-center py-10">Update Subscription</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="login-form"
        className="rounded-2xl bg-secondary p-10 ">
        {/* Status */}
        <div className="mb-5">
          <Label htmlFor="status">Status</Label>
          <TextInput
            id="status"
            type="text"
            register={register}
            name="status"
            error={errors.status?.message}
          />
        </div>

        {/* Plan */}
        <div className="mb-5">
          <Label htmlFor="plan">Plan</Label>
          <TextInput
            id="plan"
            type="text"
            register={register}
            name="plan"
            error={errors.plan?.message}
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

export default Update;
