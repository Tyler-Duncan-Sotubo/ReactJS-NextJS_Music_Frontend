"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { distros } from "@/data/data";
import Image from "next/image";
import Navigation from "@/app/Navigation";
import Carousel from "@/components/Slider";
import Footer from "@/components/Footer";
import SubscriptionPlan from "@/components/SubscriptionPlan";
import { IoCloseCircle } from "react-icons/io5";
import { useReleases } from "@/hooks/releases";
import Link from "next/link";

const HomePage = ({ nairaToDollarsRateToday }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    router.refresh();
  }, []);

  const { releases } = useReleases();
  return (
    <>
      {isMounted && (
        <section>
          {showModal && (
            <section className="fixed md:hidden inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
              <div className="relative w-[80vw] h-[60vh]">
                <Image
                  src="/img/hero/popup.jpg"
                  alt="Banner Ad"
                  fill
                  style={{ objectFit: "contain" }}
                />
                <div className="absolute top-12 right-6 text-white">
                  <IoCloseCircle
                    size={40}
                    className="cursor-pointer "
                    onClick={() => setShowModal(false)}
                  />
                </div>
              </div>
            </section>
          )}

          <Navigation />
          {/* Hero Section */}
          <div className="relative bg-[url('/img/hero/homepage.png')] bg-cover min-h-screen md:mt-[5rem]">
            <div className="absolute px-5 transform -translate-y-1/3 top-1/3  md:w-1/2 md:pl-20">
              <h1 className="text-white tracking-wide font-bold md:text-6xl ">
                The simplest way to sell your music globally.
              </h1>
              <h3 className="text-secondary mt-6 font-medium capitalize">
                Helping independent artist and Labels Reach millions of
                listeners – easier than ever before
              </h3>
            </div>
            <div className="absolute md:top-3/4 top-2/3 w-full mx-auto">
              <h3 className="text-white font-bold uppercase text-center text-sm">
                Get Your Music On
              </h3>
              <div className="flex flex-wrap px-5 gap-5 justify-center md:gap-10">
                {distros.map((distro, index) => (
                  <div
                    key={index}
                    className="hover:scale-125 duration-300 relative w-24 h-16 md:w-36 md:h-16">
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

          {/* Why Choose Us  */}
          <section className="mt-12">
            <div className=" w-[85%] mx-auto">
              <div className="md:flex-row-between gap-16">
                <div className="md:w-[50%]">
                  <h1 className="text-5xl md:text-7xl font-bold">
                    Don&apos;t stand alone in the rain
                  </h1>
                  <h3 className="text-xl mt-6 tracking-wide">
                    - We take care of hurdles in distribution.
                  </h3>
                  <h3 className="text-lg mt-6 tracking-wider text-black">
                    We distribute your music to top digital music services like
                    Spotify, Apple Music, Tidal, Amazon Music, and more. We also
                    help you promote your music and get it heard by millions of
                    new fans.
                  </h3>
                </div>
                <div className="md:w-[50%] justify-self-end">
                  <Image
                    src="/img/image_test_four.jpg"
                    alt="why choose us"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
            </div>
            <div className="w-[85%] mx-auto py-24">
              <div className="flex flex-col-reverse md:flex md:flex-row items-center gap-16">
                <div className="md:w-[50%]">
                  <Image
                    src="/img/image_test_three.jpg"
                    alt="why choose us"
                    width={600}
                    height={500}
                  />
                </div>
                <div className="md:w-[55%]">
                  <h1 className="text-5xl md:text-7xl font-bold">
                    Keep 100% of Your Rights
                  </h1>
                  <h3 className="text-xl mt-6 tracking-wide">
                    - Focus on what you do best. We&apos;ll take care of the
                    rest.
                  </h3>
                  <h3 className="text-lg mt-6 tracking-wider text-black">
                    Be in control of your success.We provide you with the tools
                    you need to succeed in the music industry. You can track
                    your sales, streaming revenue, and more from your dashboard.
                  </h3>
                </div>
              </div>
            </div>
          </section>

          {/* Latest Releases */}
          <section className="w-[90%] mx-auto my-20">
            <div className="flex justify-center items-center">
              <h1 className="text-4xl font-bold">New Releases</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 w-full">
              {releases?.slice(0, 8).map((release: any, index: number) => (
                <Link href={release.smartLink} key={index} target="_blank">
                  <div className="w-full flex flex-col items-center">
                    <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[330px] ">
                      <Image
                        src={release.releaseCover}
                        alt={release.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <h3 className="md:text-lg font-bold text-sm text-center">
                      {release.title}
                    </h3>
                    <h3 className="text-zinc-900 mt-1 mb-10 md:text-lg text-sm">
                      {release.artist}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Subscription Plan */}
          <section className="w-[90%] mx-auto">
            <SubscriptionPlan
              header="Choose Your Perfect Plan"
              nairaToDollarsRateToday={nairaToDollarsRateToday}
            />
          </section>

          {/* Vevo */}
          <section className="relative bg-[url('/img/VevoBg.jpg')] bg-cover bg-blend-overlay bg-zinc-900 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-white tracking-wide font-bold text-4xl md:text-7xl md:w-1/2 text-center px-3">
              Release Official Music Videos on Vevo
            </h1>
            <h3 className="text-secondary mt-6 font-medium capitalize text-center text-lg tracking-wider md:w-1/2 px-3">
              Get your music videos live on VEVO and start earning royalties
              from the world’s most popular music video platforms. From channel
              setup to video uploads, we’ve got you covered.
            </h3>
            <div className="my-20 flex gap-9">
              <div className="hover:scale-125 duration-300 relative w-24 h-16 md:w-36 md:h-16">
                <Image
                  src="/img/distros/vevo-auth.svg"
                  alt="logo of vevo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="hover:scale-125 duration-300 relative w-24 h-16 md:w-36 md:h-16">
                <Image
                  src="/img/distros/youtube-music-auth.svg"
                  alt="logo of vevo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="my-20">
            <Carousel />
          </section>

          {/* Footer */}
          <Footer />
        </section>
      )}
    </>
  );
};

export default HomePage;
