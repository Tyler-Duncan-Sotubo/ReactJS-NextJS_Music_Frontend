"use client";

import SocialInput from "@/components/SocialMediaInput";
import Label from "@/components/Label";
import TextInput from "@/components/TextInput";
import { ArtistDetailsInput } from "../types/artist.type";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArtistDetailsSchema } from "../schema/artist.schema";
import countries from "@/data/countries.json";
import { useState } from "react";
import { userInformationAuth } from "@/hooks/user";

const RenderUserAccount = ({ userInformation, user }: any) => {
  // Get Hook to create and update user information
  const { createUserInformation, updateUserInformation } =
    userInformationAuth();

  // State to handle submit error
  const [submitError, setSubmitError] = useState<string>("");

  // Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArtistDetailsInput>({
    resolver: yupResolver(ArtistDetailsSchema) as Resolver<
      ArtistDetailsInput,
      any
    >,
    defaultValues: {
      firstName: userInformation?.firstName,
      lastName: userInformation?.lastName || "",
      artistName: userInformation?.artistName || "",
      label: userInformation?.label || "",
      phone: userInformation?.phone || "",
      howDidYouHearAboutUs: userInformation?.howDidYouHearAboutUs || "",
      twitter: userInformation?.twitter || "",
      vevo: userInformation?.vevo || "",
      facebook: userInformation?.facebook || "",
      instagram: userInformation?.instagram || "",
      youtube: userInformation?.youtube || "",
    },
  });

  // On Submit
  const onSubmit = (data: ArtistDetailsInput) => {
    // Check if user information exists
    // If not create user information
    if (userInformation?.message === "User Information Not Found") {
      createUserInformation({
        ...data,
        userId: user.id,
        setSubmitError,
      });
    } else {
      // If user information exists update user information
      updateUserInformation({
        ...data,
        userId: user.id,
        setSubmitError,
      });
    }
  };

  return (
    <>
      <h1 className="text-center text-5xl md:mt-32">My Account</h1>
      <h3 className="text-center mt-5">
        Update Your profile with artist information and all social media handles
      </h3>
      {/* Artist information form */}
      <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto my-10">
        <h2 className="text-4xl border-b border-dashed py-10 mb-10">
          1. Personal Information
        </h2>
        <article className="grid grid-cols-1 md:grid-cols-2 md:w-[60%] md:gap-4 gap-2">
          {/* First Name */}
          <div className=" relative w-full">
            <Label htmlFor="firstName">First Name</Label>
            <TextInput
              register={register}
              name="firstName"
              error={errors.firstName?.message}
              id="firstName"
              type="text"
            />
          </div>

          {/* Last Name */}
          <div className=" relative w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <TextInput
              register={register}
              name="lastName"
              error={errors.lastName?.message}
              id="lastName"
              type="text"
            />
          </div>
          {/* Artist Name */}
          <div className="relative w-full">
            <Label htmlFor="artistName">Artist Name</Label>
            <TextInput
              register={register}
              name="artistName"
              error={errors.artistName?.message}
              id="artistName"
              type="text"
            />
          </div>

          {/* Label */}
          <div className="relative w-full">
            <Label htmlFor="label">Label</Label>
            <TextInput
              register={register}
              name="label"
              error={errors.label?.message}
              id="label"
              type="text"
            />
          </div>

          {/* Phone Number */}
          <div className="relative w-full">
            <Label htmlFor="phone">Phone Number</Label>
            <TextInput
              register={register}
              name="phone"
              error={errors.phone?.message}
              id="phone"
              type="text"
            />
          </div>
          {/* Country */}
          <div className="relative w-full">
            <Label htmlFor="country">Country</Label>
            <select
              {...register("country")}
              id="country"
              className="w-full rounded-md shadow-sm">
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p style={{ color: "red" }}> {errors.country.message}</p>
            )}
          </div>

          {/* How did you hear about us */}
          <div className="relative w-full mt-6 md:mt-0">
            <Label htmlFor="howDidYouHearAboutUs">
              How did you hear about us
            </Label>
            <TextInput
              register={register}
              name="howDidYouHearAboutUs"
              error={errors.howDidYouHearAboutUs?.message}
              id="howDidYouHearAboutUs"
              type="text"
            />
          </div>
        </article>

        {/* Social Media */}
        <h2 className="text-4xl border-b border-dashed py-10 mb-10">
          2. Social Media
        </h2>

        <article className="grid grid-cols-1 md:grid-cols-5 md:gap-4 gap-2">
          {/* Twitter */}
          <div className="relative w-full">
            <Label htmlFor="twitter">Twitter</Label>
            <SocialInput
              register={register}
              name="twitter"
              error={errors.twitter?.message}
              id="twitter"
              type="text"
            />
          </div>

          {/* Vevo */}
          <div className="relative w-full">
            <Label htmlFor="vevo">Vevo</Label>
            <SocialInput
              register={register}
              name="vevo"
              error={errors.vevo?.message}
              id="vevo"
              type="text"
            />
          </div>

          {/* Facebook */}
          <div className="relative w-full">
            <Label htmlFor="facebook">Facebook</Label>
            <SocialInput
              register={register}
              name="facebook"
              error={errors.facebook?.message}
              id="facebook"
              type="text"
            />
          </div>
          {/* Instagram */}
          <div className="relative w-full">
            <Label htmlFor="instagram">Instagram</Label>
            <SocialInput
              register={register}
              name="instagram"
              error={errors.instagram?.message}
              id="instagram"
              type="text"
            />
          </div>
          {/* Youtube */}
          <div className=" relative w-full">
            <Label htmlFor="youtube">Youtube</Label>
            <TextInput
              register={register}
              name="youtube"
              error={errors.youtube?.message}
              id="howDidYouHearAboutUs"
              type="text"
            />
          </div>
        </article>
        {/* submit error */}
        {submitError && <p className="text-error my-5">{submitError}</p>}
        {/* Save Changes */}
        <div className="my-10">
          <button className=" w-1/4 py-2 bg-primary text-white rounded-md">
            Save Details
          </button>
        </div>
      </form>
    </>
  );
};

export default RenderUserAccount;
