import { useLabel } from "@/hooks/label";
import LabelHomepage from "./LabelHomepage";

const page = async () => {
  const { fetchLabel, fetchArtists } = useLabel();
  const artists = await fetchArtists();
  const label = await fetchLabel();

  return <LabelHomepage label={label} artists={artists} />;
};

export default page;
