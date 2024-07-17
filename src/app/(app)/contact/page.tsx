"use client";

import Button from "@/components/Button";
import { toast } from "react-toastify";
import Label from "@/components/Label";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactInput } from "./types/contactInput.type";
import { ContactSchema } from "./schema/contactInput.schema";
import TextInput from "@/components/TextInput";
import emailjs from "@emailjs/browser";
import SocialIcons from "./SocialIcons";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: yupResolver(ContactSchema) as Resolver<ContactInput, any>,
  });

  const onSubmit = (data: ContactInput, e: any) => {
    let subject = "";

    if (data.general) {
      subject = "General";
    } else if (data.digital_distribution) {
      subject = "Digital distribution";
    } else if (data.payment_error) {
      subject = "Payment Error";
    }

    // send email
    const emailData = {
      email: data.email,
      name: data.name,
      message: data.message,
      subject,
    };

    emailjs
      .send(
        "service_ai7oteq",
        "template_brr0qvb",
        emailData,
        "CyMbXRk8pnr8YsgLJ"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            toast.success("Message sent", {
              position: "top-right",
            });
            e.target.reset();
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const Divider = () => (
    <div className="flex items-center my-10">
      <div className="border-t-4 border-gray-300 md:w-1/3 w-1/2 border-primary"></div>
    </div>
  );

  return (
    <div className="w-[90%] mx-auto mt-12 md:mt-40 mb-6">
      <h1 className="text-6xl">Contact Us</h1>
      <Divider />
      {/* Social Media Links */}
      <SocialIcons />

      {/* Email form*/}
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 my-20">
        {/* Name */}
        <div>
          <Label htmlFor="Name">Full Name</Label>
          <TextInput
            register={register}
            name="name"
            error={errors.name?.message}
            id="email"
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

        {/* Nature Of Enquiry */}
        <section>
          <Label htmlFor="natureOfEnquiry">
            What's the nature of your inquiry? (Select all that apply)
          </Label>
          <div className="flex items-center justify-between mt-6">
            <label
              htmlFor="general"
              className="inline-flex items-center"
              data-testid="remember me">
              <input
                id="general"
                type="checkbox"
                {...register("general")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm  text-gray-600">General</span>
            </label>
          </div>
          <div className="flex items-center justify-between mt-6">
            <label
              htmlFor="digital_distribution"
              className="inline-flex items-center"
              data-testid="remember me">
              <input
                id="digital_distribution"
                type="checkbox"
                {...register("digital_distribution")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm  text-gray-600">
                Digital distribution
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between mt-6">
            <label
              htmlFor="payment_error"
              className="inline-flex items-center"
              data-testid="remember me">
              <input
                id="payment_error"
                type="checkbox"
                {...register("payment_error")}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Payment Error</span>
            </label>
          </div>
        </section>

        {/* Subject */}
        <div className="my-10">
          <Label htmlFor="subject" className="text-xl">
            Tell us more *
          </Label>
          <textarea
            className="w-full h-60 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 
        focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-secondary outline-none resize-none"
            {...register("message")}></textarea>
        </div>

        <div className="flex items-center mt-10 ">
          <Button className=" px-8">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default page;
