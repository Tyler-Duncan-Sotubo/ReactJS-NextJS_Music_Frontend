"use client";

import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import Image from "next/image";
import React from "react";
import { Link as Scroll } from "react-scroll";
import { promo, whyPromoteWithUs, promoFAQ } from "@/data/promo";

const RenderPromoPage = () => {
  return (
    <section className="bg-gradient-to-r from-backgroundTo from-15% via-black via-30%  to-black to-90%">
      {/* Hero Section */}
      <div className="relative h-[92vh] w-[95%] mx-auto">
        <div className="absolute px-10 transform md:-translate-y-1/3 md:top-1/3 -translate-y-1/2 top-1/2 md:w-[55%] md:pl-20">
          <h1 className="text-white tracking-wide font-bold text-5xl md:text-7xl uppercase drop-shadow-2xl ">
            Music promotion
          </h1>
          <h1 className="text-primaryHover tracking-wide font-bold text-3xl md:text-6xl capitalize drop-shadow-2xl mt-2 ">
            <span className="text-white">done</span> right!
          </h1>
          <h3 className="text-secondary mt-6 font-medium capitalize leading-relaxed tracking-wider">
            Promote your music with Spotify playlists and influencers’ TikTok
            videos. Online press. Social strategy. Sponsored Ads. to elevate
            your music career to the next level.
          </h3>
          <div className="mt-10">
            <Scroll to="packages" smooth={true} duration={600}>
              <button className="text-sm md:text-xl tracking-normal text-white uppercase font-bold bg-primary px-16 py-6 border border-x-gray rounded-full hover:bg-primaryHover focus:bg-primaryHover">
                Choose A Package
              </button>
            </Scroll>
          </div>
        </div>

        <div className="absolute hidden md:block px-10 transform md:-translate-y-2/3 md:top-2/3 -translate-y-1/2 top-1/2 right-0 md:pl-20 ">
          <div className="flex gap-10">
            <Image
              src="/img/promo/spotify-charts.svg"
              alt="promo"
              width={250}
              height={250}
            />
            <Image
              src="/img/promo/tiktok-chart.svg"
              alt="promo"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>

      {/* Why Promote With Us */}
      <div className="text-white  mx-auto ">
        <h1 className="text-white text-2xl md:text-4xl  font-bold text-center">
          Why promote with us?
        </h1>
        <article className="md:w-[80%] my-20 mx-auto">
          {whyPromoteWithUs.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col-reverse md:flex-row items-center text-center md:text-left md:gap-20 mb-12 md:mb-0 ${
                index % 2 ? "md:flex-row-reverse" : ""
              }`}>
              <div className="flex justify-center md:justify-normal ">
                <div
                  key={index}
                  className="relative w-[400px] h-[400px] md:w-[350px] md:h-[350px] mt-6">
                  <Image
                    src={item.image}
                    alt={`logo of ${item.title}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-4xl mt-8 font-bold">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg text-secondary tracking-wide">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </article>
      </div>

      {/* Choose A Package */}
      <section
        id="packages"
        className="flex flex-col items-center justify-center py-20 w-[85%] mx-auto">
        <h1 className="text-white text-4xl font-bold">Choose A Package</h1>
        <h3 className="text-secondary mt-8 text-center uppercase text-2xl font-bold w-[50%]">
          Get your music heard by the right audience with our range of promotion
        </h3>

        {/* Promo Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-10">
          {promo.map((item, index) => (
            <div
              key={index}
              className="shadow-xl bg-white px-8 py-4 rounded-3xl text-center">
              <div className="w-full mt-2 text-black flex flex-col justify-center items-center">
                <h3 className="text-lg md:text-2xl font-bold capitalize">
                  {item.name}
                </h3>
                <p className="mt-2 text-lg tracking-wide ">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions For Promotion */}
      <FrequentlyAskedQuestions
        faqs={promoFAQ}
        header="Frequently Asked Questions"
        className=" text-white md:w-[80%]"
      />
    </section>
  );
};

export default RenderPromoPage;
