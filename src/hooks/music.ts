import useSWR from "swr";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useMusic = () => {
  const router = useRouter();
  const {
    data: releases,
    error,
    mutate,
  } = useSWR("api/music/releases", () =>
    axios
      .get("api/music/releases")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      })
  );

  const uploadUserMusic = async ({ setSubmitError, ...props }: any) => {
    setSubmitError("");
    axios
      .post("api/music/create/audio", props)
      .then(() => mutate())
      .then(() =>
        toast.success("Music uploaded successfully", {
          position: "top-right",
        })
      )
      .then(() => router.push("/dashboard"))
      .catch((error) => {
        setSubmitError(error.response.data.message);
      });
  };

  const uploadVideo = async ({ setSubmitError, ...props }: any) => {
    setSubmitError("");
    axios
      .post("api/music/create/video", props)
      .then(() => mutate())
      .then(() =>
        toast.success("Video uploaded successfully", {
          position: "top-right",
        })
      )
      .then(() => router.push("/dashboard"))
      .catch((error) => {
        setSubmitError(error.response.data.message);
      });
  };

  return {
    releases,
    uploadUserMusic,
    uploadVideo,
  };
};
