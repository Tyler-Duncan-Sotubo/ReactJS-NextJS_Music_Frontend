"use client";

import React from "react";
import Image from "next/image";
import { distros } from "@/data/data";
import Button from "@/components/Button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="relative bg-[url('/img/hero/musicdistro.png')] bg-cover h-[92vh]">
        <div className="absolute px-10 transform -translate-y-1/3 top-1/3 md:w-[45%] md:pl-20">
          <h1 className="text-white tracking-wide font-bold text-5xl md:text-6xl capitalize">
            Get on the biggest music platforms.
          </h1>
          <h3 className="text-secondary mt-6 font-medium capitalize">
            Reach millions of listeners worldwide and keep everything you earn.
          </h3>
        </div>
        <div className="absolute md:top-3/4 top-2/3 w-full mx-auto">
          <div className="flex flex-wrap px-5 gap-5 justify-center md:gap-10 mt-10">
            {distros.map((distro, index) => (
              <div
                key={index}
                className="hover:scale-125 duration-300 relative w-24 h-16 md:w-36 md:h-20">
                <Image
                  src={distro.image}
                  alt={`logo of ${distro.name}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <section className="stores bg-white min-h-screen py-10 w-[90%] mx-auto ">
        <h4 className="text-xl text-center my-10 capitalize">
          Get on Biggest Stores in the world
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 items-center justify-center md:gap-10 gap-3">
          {distro.map((distro, index) => (
            <div
              key={index}
              className=" bg-white shadow-xl rounded-xl relative w-full h-36 flex justify-center items-center">
              <div className="relative h-36 w-36">
                <Image
                  src={distro.image}
                  alt={`logo of distro`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="hover:scale-105 duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="w-[85%] mx-auto py-24">
          <div className="flex items-center md:w-1/2 mx-auto">
            <h1 className="text-4xl md:text-58xl text-center mt-4 mb-10">
              How to Sell Your Music Online
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-10 my-10">
            {howToSell.map((how, index) => (
              <div key={index}>
                <h1 className="text-center">{index + 1}</h1>
                <h3 className="text-3xl font-bold text-center my-8 tracking-wide">
                  {how.title}
                </h3>
                <p className="text-lg mt-4 text-center tracking-wide">
                  {how.description}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <Link href="/register">
              <Button className="bg-primary text-white py-3 px-8 mx-auto">
                <p className="text-xl capitalize">Sign Up Now</p>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

const distro = [
  { image: "/img/distros/apple_music.svg" },
  { image: "/img/distros/deezer.svg" },
  { image: "/img/distros/spotify.svg" },
  { image: "/img/distros/boomplay.svg" },
  { image: "/img/distros/tidal.svg" },
  { image: "/img/distros/itunes.svg" },
  { image: "/img/distros/youtube_music.svg" },
  { image: "/img/distros/itunes_radio.svg" },
  { image: "/img/distros/saavn.svg" },
  { image: "/img/distros/soundcloud.svg" },
  { image: "/img/distros/tiktok.svg" },
  { image: "/img/distros/huawei.svg" },
  { image: "/img/distros/kkbox.svg" },
  { image: "/img/distros/peleton.svg" },
  { image: "/img/distros/audiomack.svg" },
  { image: "/img/distros/youtube.svg" },
  { image: "/img/distros/vevo.svg" },
  { image: "/img/distros/beatport.svg" },
  { image: "/img/distros/napster.svg" },
  { image: "/img/distros/digital.svg" },
];

const howToSell = [
  {
    title: "Upload Your Music",
    description:
      "Upload your tracks, artwork, and release information quickly and easily. In addition to Spotify, Apple Music, Amazon, and iTunes, choose from 150+ additional digital store and streaming services.",
  },
  {
    title: "Get Discovered",
    description:
      "We'll help you get your music heard by millions of new fans. We'll also help you promote your music and get it featured on top playlists.",
  },
  {
    title: "Earn Money",
    description:
      "Keep 100% of your rights. We'll pay you every time your music is streamed or downloaded.",
  },
];
