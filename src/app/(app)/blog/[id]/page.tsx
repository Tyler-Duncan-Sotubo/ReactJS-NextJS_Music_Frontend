"use client";

import { FaArrowLeft } from "react-icons/fa";
import React from "react";
import { useParams } from "next/navigation";
import { blogPost } from "@/data/blog";
import Image from "next/image";
import parse from "html-react-parser";
import RenderBanner from "./RenderBanner";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  HtmlContent: string;
};

const page = () => {
  const { id } = useParams();
  const post = blogPost.find((post) => post.id === id);

  return (
    <>
      <section className="md:my-32 my-10 md:w-[85%] w-[90%] mx-auto">
        <div className="my-10">
          <Link
            href="/blog"
            className="text-primaryHover flex items-center gap-2">
            <FaArrowLeft />
            All Post
          </Link>
        </div>
        {post ? (
          <section className="md:flex  gap-10">
            <article className="md:w-[75%]">
              <div className="relative w-full h-[500px] ">
                <Image
                  src={post.image}
                  alt="blog image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h2 className="md:text-5xl text-3xl font-bold mt-4">
                {post.title}
              </h2>
              <p className="text-primaryHover mt-4">{post.date}</p>
              <p className="text-2xl  italic mt-4">{post.subtitle}</p>
              <div className="mt-8 blog">{parse(post.HtmlContent)}</div>
            </article>
            <aside className="md:w-[30%]">
              <RenderBanner />
            </aside>
          </section>
        ) : null}
      </section>
    </>
  );
};

export default page;
