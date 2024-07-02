"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import { vevoFAQ } from "@/data/data";
import { useAppSelector } from "@/redux/hooks/hooks";

const page = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <section>
      <div className="relative bg-[url('/img/hero/vevo.jpg')] bg-cover h-[92vh]">
        <div className="absolute px-5 transform -translate-y-1/2 top-1/2 md:w-1/2 md:pl-20">
          <h1 className="text-white tracking-wide font-bold md:text-6xl ">
            Get your music videos on VEVO
          </h1>
          <h3 className="text-secondary mt-6 font-medium capitalize">
            Make your music videos available on the largest video network in the
            world through Vevo
          </h3>
          <div className="my-10 flex gap-9">
            <div className="relative w-40 h-28">
              <Image
                src="/img/distros/vevo-auth.svg"
                alt="logo of vevo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="relative w-40 h-28">
              <Image
                src="/img/distros/youtube-music-auth.svg"
                alt="logo of vevo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* How to get on Video */}
      <article className="w-[90%] mx-auto my-20">
        <h1 className="text-center md:w-1/2 mx-auto my-16 capitalize">
          How to get your music on VEVO
        </h1>
        <div className="md:flex-row-between flex flex-col md:flex-row gap-10">
          <ul className="tracking-wide text-xl list-decimal list-inside md:w-1/2 flex flex-col gap-3">
            <li>Sign up for an account</li>
            <li>Set up an official Vevo artist channel.</li>
            <li>Submit your music videos for review</li>
            <li>
              Add credits and any collaborators to be paid by Vevo
              automatically.
            </li>
            <li>Start earning money</li>
            <li>Track and Withdraw Your Earnings</li>
          </ul>
          <div className="md:w-1/2">
            <Image
              src="/img/vevo-inside.png"
              alt="vevo steps"
              width={800}
              height={600}
            />
          </div>
        </div>
      </article>
      <article className="">
        <div className="w-[90%] mx-auto my-20">
          <div className="md:flex-row-between flex flex-col-reverse md:flex-row gap-10">
            <div className="md:w-1/2">
              <Image
                src="/img/vevo-why.png"
                alt="why choose vevo"
                width={600}
                height={400}
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-center md:w-1/2 mx-auto my-6 capitalize">
                Why Vevo?
              </h1>
              <p className="text-xl tracking-wide mb-10">
                With more than 900,000 videos from artists of all levels and
                genres, Vevo maintains the largest network of music channels on
                YouTube, as well as global distribution through a growing number
                of partners.
              </p>
              <p className="text-xl tracking-wide mb-10">
                For over a decade, fans have come to recognize the Vevo logo as
                a verified indicator of premium, official content from the
                artists they are searching for and those they’ve yet to
                discover.
              </p>
              <p className="text-xl tracking-wide mb-10">
                In addition to YouTube, Vevo distributes its extensive library
                of music videos to major Connected TV platforms and streaming
                services, including Apple TV, Hulu + Live TV, Pluto TV, Samsung
                TV Plus, and Roku. To learn more about Vevo&apos;s position on
                smart TVs and other connected devices.
              </p>
            </div>
          </div>
        </div>

        {/* Vevo Pricing */}
        <h1 className="text-center md:w-1/2 mx-auto my-10 capitalize">
          Pricing
        </h1>
        <article className="flex sm:flex-row flex-col gap-10 text-white md:w-[80%] w-[90%] mx-auto">
          <div className="bg-black md:w-1/2 h-[400px] flex justify-center items-center flex-col gap-12 rounded-xl">
            <p className="text-3xl w-2/3 text-center font-bold ">
              VEVO Channel Set up & Video Upload
            </p>
            <p className="text-5xl">₦ 100,000</p>
            <Link href={user ? "/dashboard/videos" : "/login"}>
              <Button>New Vevo Channel</Button>
            </Link>
          </div>
          <div className="bg-primary md:w-1/2 h-[400px] flex justify-center items-center flex-col gap-12 rounded-xl">
            <p className="text-3xl w-2/3 text-center font-bold ">
              VEVO Video Upload
            </p>
            <p className="text-5xl">₦ 30,000</p>
            <Link href={user ? "/dashboard/videos" : "/login"}>
              <Button
                className="bg-white border-primary hover:text-white border-2"
                color="text-black">
                New Vevo Video
              </Button>
            </Link>
          </div>
        </article>
      </article>
      <div className="mt-20">
        <FrequentlyAskedQuestions
          faqs={vevoFAQ}
          header="Frequently Asked Questions"
        />
      </div>
    </section>
  );
};

export default page;
