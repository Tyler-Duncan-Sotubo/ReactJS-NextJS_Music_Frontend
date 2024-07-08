import { adminFetch } from "../../hooks/adminFetch";
import PostStreams from "./PostStreams";

interface PageProps {
  params: {
    id: string;
  };
}
const page = async ({ params }: PageProps) => {
  const { fetchAudioById } = adminFetch();
  const audio = await fetchAudioById(params.id);
  return <PostStreams audio={audio} />;
};

export default page;
