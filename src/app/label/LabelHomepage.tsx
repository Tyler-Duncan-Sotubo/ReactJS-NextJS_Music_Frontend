import Link from "next/link";
import React from "react";

interface label {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface artist {
  id: number;
  name: string;
  email: string;
}

type LabelProps = {
  label: label;
  artists: any;
};

const LabelHomepage = ({ label, artists }: LabelProps) => {
  return (
    <>
      <section className="w-[90%] mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-3 mt-12 md:mt-36 my-16">
        <div className="md:w-1/2">
          <p className="text-black text-2xl mb-8">Welcome, {label?.name}</p>
          <h1 className="text-5xl md:text-7xl tracking-wider leading-tight mb-5 font-semibold">
            Track And Control Your Artists
          </h1>
          <h4>
            From Your Label Dashboard you can view your releases, manage your
            account details, edit your
            <Link href="/label/profile" className="text-primary mx-1 font-bold">
              name
            </Link>
            track your artists
            <Link href="/label/sales" className="text-primary mx-1 font-bold">
              royalties
            </Link>
            and request a
            <Link href="/label/payout" className="text-primary mx-1 font-bold">
              payout
            </Link>
            .
          </h4>
        </div>
      </section>
      <section className="w-[90%] mx-auto my-20">
        <div className="flex justify-between mb-6">
          <h3 className="font-bold">Artists</h3>
          {artists?.length > 1 && (
            <Link href="/label/artists" className="text-primary mx-1 font-bold">
              View All
            </Link>
          )}
        </div>
        <table className="w-full bg-white border-secondary ">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 ">#</th>
              <th className="px-4 py-2">Artist</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(artists) &&
              artists.slice(0, 3).map((artist: artist, index: any) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{artist.name}</td>
                  <td className="px-4 py-2 text-center">{artist.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default LabelHomepage;
