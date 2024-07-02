"use client";

import useSWR from "swr";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

export const userInformationAuth = () => {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("api/user/account/", () =>
    axios
      .get("api/user/account/")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  const createUserInformation = async ({ setSubmitError, ...props }: any) => {
    setSubmitError("");
    axios
      .post("api/user/account/", props)
      .then(() => mutate())
      .then(() =>
        toast.success("User information created successfully", {
          position: "top-right",
        })
      )
      .catch((error) => {
        setSubmitError(error.response.data.message);
      }).then;
  };

  const updateUserInformation = async ({ setSubmitError, ...props }: any) => {
    setSubmitError("");
    axios
      .put("api/user/account/", props)
      .then(() => mutate())
      .then(() =>
        toast.success("User information updated successfully", {
          position: "top-right",
        })
      )
      .catch((error) => {
        setSubmitError(error.response.data.message);
      });
  };

  return {
    isLoading,
    user,
    createUserInformation,
    updateUserInformation,
  };
};
