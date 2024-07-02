"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

type Audio = {
  id: string;
  title: string;
  artist: string;
  releaseCover: string;
  status: string;
  UPC: string;
  ISRC: string;
  smartLink: string;
};

interface RenderAudiosListProps {
  audios: Audio[];
  amountToShow: number;
}

const RenderAudiosList = ({ audios, amountToShow }: RenderAudiosListProps) => {
  const [selectedAudio, setSelectedAudio] = useState<Audio[]>(audios);

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold text-center my-10">Audios</h1>
      <div className="flex justify-center my-10">
        <input
          type="text"
          placeholder="Search for a title"
          className="w-[50%] px-4 py-2 border border-secondary rounded-lg"
          onChange={(e) => {
            const searchValue = e.target.value.toLowerCase();
            const filteredAudios = audios.filter((audio) =>
              audio.title.toLowerCase().includes(searchValue)
            );
            setSelectedAudio(filteredAudios);
          }}
        />
      </div>

      <table className="w-[95%] mx-auto bg-white border border-secondary">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Artist</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">UPC</th>
            <th className="px-4 py-2 border">ISRC</th>
            <th className="px-4 py-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {selectedAudio
            .reverse()
            .slice(0, amountToShow)
            .map((audio: Audio, index: any) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-center">{audio.title}</td>
                <td className="px-4 py-2 text-center">{audio.artist}</td>
                <td className="px-4 py-2 text-center">{audio.status}</td>
                <td className="px-4 py-2 text-center">{audio.UPC}</td>
                <td className="px-4 py-2 text-center">{audio.ISRC}</td>
                <td className="px-4 py-2 flex justify-center">
                  <Link href={`/admin/audio/${audio.id}`}>
                    <td className="px-4 py-2 flex justify-center">
                      <FaEdit />
                    </td>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RenderAudiosList;
