"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

export const useReleases = () => {
  const {
    data: releases,
    error,
    isLoading,
    mutate,
  } = useSWR("api/music/latest-releases", () =>
    axios
      .get("api/music/latest-releases")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  return {
    releases,
  };
};
