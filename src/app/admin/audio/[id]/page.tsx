import { adminFetch } from "../../hooks/adminFetch";
import UpdateAudio from "./UpdateAudio";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { fetchAudioById } = adminFetch();
  const audio = await fetchAudioById(params.id);
  return (
    <div>
      <UpdateAudio audio={audio} />
    </div>
  );
};

export default page;
