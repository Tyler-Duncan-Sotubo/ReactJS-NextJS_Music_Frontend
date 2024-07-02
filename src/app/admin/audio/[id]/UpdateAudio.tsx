"use client";

import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AudioUpdate } from "../../types";
import { AudioUpdateSchema } from "../../schema";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import Button from "@/components/Button";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type UpdateAudioProps = {
  audio: any;
};

const UpdateAudio = ({ audio }: UpdateAudioProps) => {
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AudioUpdate>({
    resolver: yupResolver(AudioUpdateSchema) as Resolver<AudioUpdate, any>,
    defaultValues: {
      status: audio.status,
      smartLink: audio.smartLink,
      UPC: audio.UPC,
      ISRC: audio.ISRC,
      releaseAudioLink: audio.releaseAudioLink,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: AudioUpdate) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/audio/${audio.id}`,
      data
    );
    if (res.status === 200) {
      toast.success("Audio Updated Successfully", {
        position: "top-right",
      });
      router.push("/admin/audio");
    } else {
      setSubmitError("Audio Update Failed");
    }
  };

  return (
    <section className="w-[90%] mx-auto">
      <h1 className="text-center py-10">Update Audio</h1>
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

        {/* SmartLink */}
        <div className="mb-5">
          <Label htmlFor="smartLink">SmartLink</Label>
          <TextInput
            id="smartLink"
            type="text"
            register={register}
            name="smartLink"
            error={errors.smartLink?.message}
          />
        </div>

        {/* UPC */}
        <div className="mb-5">
          <Label htmlFor="UPC">UPC</Label>
          <TextInput
            id="UPC"
            type="text"
            register={register}
            name="UPC"
            error={errors.UPC?.message}
          />
        </div>

        {/* ISRC */}
        <div className="mb-5">
          <Label htmlFor="ISRC">ISRC</Label>
          <TextInput
            id="ISRC"
            type="text"
            register={register}
            name="ISRC"
            error={errors.ISRC?.message}
          />
        </div>

        {/* Release Audio Link */}
        <div className="mb-5">
          <Label htmlFor="releaseAudioLink">Release Audio Link</Label>
          <TextInput
            id="releaseAudioLink"
            type="text"
            register={register}
            name="releaseAudioLink"
            error={errors.releaseAudioLink?.message}
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

export default UpdateAudio;
