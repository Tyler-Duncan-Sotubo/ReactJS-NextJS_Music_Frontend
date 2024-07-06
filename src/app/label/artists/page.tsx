import { useLabel } from "@/hooks/label";
import { FaCircleUser } from "react-icons/fa6";

interface artist {
  id: number;
  name: string;
  email: string;
}

const page = async () => {
  const { fetchArtists } = useLabel();
  const artists = await fetchArtists();
  return (
    <section className="mt-12 md:pt-20 py-16 bg-secondary">
      <section className="w-[90%] mx-auto">
        <h2>My Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          {Array.isArray(artists) &&
            artists.map((artist: artist, index: number) => (
              <div
                key={index}
                className="bg-white p-10 shadow-md flex items-center justify-center flex-col min-h-72">
                <FaCircleUser size={200} />
                <h4 className="my-3 font-medium text-center">{artist.name}</h4>
                <p className="text-primary">1 Release</p>
              </div>
            ))}
        </div>
      </section>
    </section>
  );
};

export default page;
