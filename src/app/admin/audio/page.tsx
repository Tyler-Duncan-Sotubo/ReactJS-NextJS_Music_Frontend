import React from "react";
import { adminFetch } from "../hooks/adminFetch";
import RenderAudiosList from "../components/RenderAudiosList";

const page = async () => {
  const { fetchAudios } = adminFetch();
  const audios = await fetchAudios();
  return <RenderAudiosList audios={audios} amountToShow={20} />;
};

export default page;
