"use client";

import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Streams } from "../../types";
import { StreamsSchema } from "../../schema";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import Button from "@/components/Button";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PostStreams = ({ audio }: any) => {
  const [submitError, setSubmitError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeezerOpen, setIsDeezerOpen] = useState<boolean>(false);
  const [isBoomplaySectionOpen, setIsBoomplaySectionOpen] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Streams>({
    resolver: yupResolver(StreamsSchema) as Resolver<Streams, any>,
    defaultValues: {
      apple: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      spotify: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      youtube: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      deezer: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      amazon: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      tidal: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      boomPlay: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      tiktok: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
      facebook: {
        total: 0,
        sat: 0,
        sun: 0,
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
      },
    },
  });
  const router = useRouter();

  const onSubmit = async (data: Streams) => {
    try {
      const response = await axios.post("streams", {
        ...data,
        audioId: audio.id,
        userId: audio.userId,
      });
      if (response.status === 201) {
        toast.success("Streams Added Successfully");
        router.push("/admin/audio");
      }
    } catch (error: any) {
      setSubmitError(error.response.data.message);
    }
  };

  const InputComponent = ({
    id,
    type,
    register,
    name,
    error,
    placeholder,
  }: any) => {
    return (
      <div className="mb-5">
        <TextInput
          id={id}
          type={type}
          register={register}
          name={name}
          error={error}
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="login-form"
      className="rounded-2xl p-10">
      {/* total_streams */}
      <InputComponent
        id="total_streams"
        type="number"
        register={register}
        name="total_streams"
        placeholder="Total Streams"
        error={errors.total_streams?.message}
      />
      {/* week_start */}
      <InputComponent
        id="week_start"
        type="text"
        register={register}
        name="week_start"
        placeholder="Week Start"
        error={errors.week_start?.message}
      />

      {/* week_end */}
      <InputComponent
        id="week_end"
        type="text"
        register={register}
        name="week_end"
        placeholder="Week End"
        error={errors.week_end?.message}
      />

      {/* Apple Music & Spotify */}
      <div
        className="flex justify-between items-center my-10 cursor-pointer"
        onClick={() => {
          console.log("click");
          setIsOpen(!isOpen);
        }}>
        <p className="font-bold">Apple Music & Spotify</p>
        <div className="duration-700 cursor-pointer">
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </div>
      </div>
      {isOpen && (
        <div className="flex gap-10  animate-slideIn mt-2">
          {/* Apple Music */}
          <section className="w-1/3">
            <h4 className="py-3">Apple</h4>
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.total"
              placeholder="Total"
              error={errors.apple?.total?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.sat"
              placeholder="Saturday"
              error={errors.apple?.sat?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.sun"
              placeholder="Sunday"
              error={errors.apple?.sun?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.mon"
              placeholder="Monday"
              error={errors.apple?.mon?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.tue"
              placeholder="Tuesday"
              error={errors.apple?.tue?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.wed"
              placeholder="Wednesday"
              error={errors.apple?.wed?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.thu"
              placeholder="Thursday"
              error={errors.apple?.thu?.message}
            />
            <InputComponent
              id="apple"
              type="number"
              register={register}
              name="apple.fri"
              placeholder="Friday"
              error={errors.apple?.fri?.message}
            />
          </section>

          {/* Spotify */}
          <section className="w-1/3">
            <h4 className="py-3">Spotify</h4>
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.total"
              placeholder="Total"
              error={errors.spotify?.total?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.sat"
              placeholder="Saturday"
              error={errors.spotify?.sat?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.sun"
              placeholder="Sunday"
              error={errors.spotify?.sun?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.mon"
              placeholder="Monday"
              error={errors.spotify?.mon?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.tue"
              placeholder="Tuesday"
              error={errors.spotify?.tue?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.wed"
              placeholder="Wednesday"
              error={errors.spotify?.wed?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.thu"
              placeholder="Thursday"
              error={errors.spotify?.thu?.message}
            />
            <InputComponent
              id="spotify"
              type="number"
              register={register}
              name="spotify.fri"
              placeholder="Friday"
              error={errors.spotify?.fri?.message}
            />
          </section>

          {/* YouTube */}
          <section className="w-1/3">
            <h4 className="py-3">YouTube</h4>
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.total"
              placeholder="Total"
              error={errors.youtube?.total?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.sat"
              placeholder="Saturday"
              error={errors.youtube?.sat?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.sun"
              placeholder="Sunday"
              error={errors.youtube?.sun?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.mon"
              placeholder="Monday"
              error={errors.youtube?.mon?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.tue"
              placeholder="Tuesday"
              error={errors.youtube?.tue?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.wed"
              placeholder="Wednesday"
              error={errors.youtube?.wed?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.thu"
              placeholder="Thursday"
              error={errors.youtube?.thu?.message}
            />
            <InputComponent
              id="youtube"
              type="number"
              register={register}
              name="youtube.fri"
              placeholder="Friday"
              error={errors.youtube?.fri?.message}
            />
          </section>
        </div>
      )}

      {/* Deezer & Amazon Music & Tidal */}
      <div
        className="flex justify-between items-center my-10 cursor-pointer"
        onClick={() => {
          console.log("click");
          setIsDeezerOpen(!isDeezerOpen);
        }}>
        <p className="font-bold">Deezer & Amazon Music & Tidal</p>
        <div className="duration-700 cursor-pointer">
          {isDeezerOpen ? (
            <FaChevronUp size={20} />
          ) : (
            <FaChevronDown size={20} />
          )}
        </div>
      </div>
      {isDeezerOpen && (
        <section className="flex gap-10 justify-between animate-slideIn mt-2">
          <section className="w-1/3">
            {/* Deezer */}
            <h4 className="py-3">Deezer</h4>
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.total"
              placeholder="Total"
              error={errors.deezer?.total?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.sat"
              placeholder="Saturday"
              error={errors.deezer?.sat?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.sun"
              placeholder="Sunday"
              error={errors.deezer?.sun?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.mon"
              placeholder="Monday"
              error={errors.deezer?.mon?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.tue"
              placeholder="Tuesday"
              error={errors.deezer?.tue?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.wed"
              placeholder="Wednesday"
              error={errors.deezer?.wed?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.thu"
              placeholder="Thursday"
              error={errors.deezer?.thu?.message}
            />
            <InputComponent
              id="deezer"
              type="number"
              register={register}
              name="deezer.fri"
              placeholder="Friday"
              error={errors.deezer?.fri?.message}
            />
          </section>

          {/* Amazon Music */}
          <section className="w-1/3">
            <h4 className="py-3">Amazon Music</h4>
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.total"
              placeholder="Total"
              error={errors.amazon?.total?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.sat"
              placeholder="Saturday"
              error={errors.amazon?.sat?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.sun"
              placeholder="Sunday"
              error={errors.amazon?.sun?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.mon"
              placeholder="Monday"
              error={errors.amazon?.mon?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.tue"
              placeholder="Tuesday"
              error={errors.amazon?.tue?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.wed"
              placeholder="Wednesday"
              error={errors.amazon?.wed?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.thu"
              placeholder="Thursday"
              error={errors.amazon?.thu?.message}
            />
            <InputComponent
              id="amazon"
              type="number"
              register={register}
              name="amazon.fri"
              placeholder="Friday"
              error={errors.amazon?.fri?.message}
            />
          </section>

          {/* Tidal */}
          <section className="w-1/3">
            <h4 className="py-3">Tidal</h4>
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.total"
              placeholder="Total"
              error={errors.tidal?.total?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.sat"
              placeholder="Saturday"
              error={errors.tidal?.sat?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.sun"
              placeholder="Sunday"
              error={errors.tidal?.sun?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.mon"
              placeholder="Monday"
              error={errors.tidal?.mon?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.tue"
              placeholder="Tuesday"
              error={errors.tidal?.tue?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.wed"
              placeholder="Wednesday"
              error={errors.tidal?.wed?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.thu"
              placeholder="Thursday"
              error={errors.tidal?.thu?.message}
            />
            <InputComponent
              id="tidal"
              type="number"
              register={register}
              name="tidal.fri"
              placeholder="Friday"
              error={errors.tidal?.fri?.message}
            />
          </section>
        </section>
      )}

      {/* Boomplay & TikTok & Facebook */}
      <div
        className="flex justify-between items-center my-10 cursor-pointer"
        onClick={() => {
          setIsBoomplaySectionOpen(!isBoomplaySectionOpen);
        }}>
        <p className="font-bold">Boomplay & TikTok & Facebook</p>
        <div className="duration-700 cursor-pointer">
          {isBoomplaySectionOpen ? (
            <FaChevronUp size={20} />
          ) : (
            <FaChevronDown size={20} />
          )}
        </div>
      </div>
      {isBoomplaySectionOpen && (
        <section className="flex gap-10 justify-between animate-slideIn mt-2">
          {/* Boomplay */}
          <section className="w-1/3">
            <h4 className="py-3">Boomplay</h4>
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.total"
              placeholder="Total"
              error={errors.boomPlay?.total?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.sat"
              placeholder="Saturday"
              error={errors.boomPlay?.sat?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.sun"
              placeholder="Sunday"
              error={errors.boomPlay?.sun?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.mon"
              placeholder="Monday"
              error={errors.boomPlay?.mon?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.tue"
              placeholder="Tuesday"
              error={errors.boomPlay?.tue?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.wed"
              placeholder="Wednesday"
              error={errors.boomPlay?.wed?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.thu"
              placeholder="Thursday"
              error={errors.boomPlay?.thu?.message}
            />
            <InputComponent
              id="boomplay"
              type="number"
              register={register}
              name="boomPlay.fri"
              placeholder="Friday"
              error={errors.boomPlay?.fri?.message}
            />
          </section>

          {/* TikTok */}
          <section className="w-1/3">
            <h4 className="py-3">TikTok</h4>
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.total"
              placeholder="Total"
              error={errors.tiktok?.total?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.sat"
              placeholder="Saturday"
              error={errors.tiktok?.sat?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.sun"
              placeholder="Sunday"
              error={errors.tiktok?.sun?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.mon"
              placeholder="Monday"
              error={errors.tiktok?.mon?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.tue"
              placeholder="Tuesday"
              error={errors.tiktok?.tue?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.wed"
              placeholder="Wednesday"
              error={errors.tiktok?.wed?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.thu"
              placeholder="Thursday"
              error={errors.tiktok?.thu?.message}
            />
            <InputComponent
              id="tiktok"
              type="number"
              register={register}
              name="tiktok.fri"
              placeholder="Friday"
              error={errors.tiktok?.fri?.message}
            />
          </section>

          {/* Facebook */}
          <section className="w-1/3">
            <h4 className="py-3">Facebook</h4>
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.total"
              placeholder="Total"
              error={errors.facebook?.total?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.sat"
              placeholder="Saturday"
              error={errors.facebook?.sat?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.sun"
              placeholder="Sunday"
              error={errors.facebook?.sun?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.mon"
              placeholder="Monday"
              error={errors.facebook?.mon?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.tue"
              placeholder="Tuesday"
              error={errors.facebook?.tue?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.wed"
              placeholder="Wednesday"
              error={errors.facebook?.wed?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.thu"
              placeholder="Thursday"
              error={errors.facebook?.thu?.message}
            />
            <InputComponent
              id="facebook"
              type="number"
              register={register}
              name="facebook.fri"
              placeholder="Friday"
              error={errors.facebook?.fri?.message}
            />
          </section>
        </section>
      )}

      {/* Error */}
      {submitError && <InputError message={submitError} />}

      {/* Submit Button */}
      <div className="flex items-center justify-end mt-10 ">
        <Button className="ml-3 px-8">Submit </Button>
      </div>
    </form>
  );
};

export default PostStreams;
