import { blogPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import RenderBanner from "./[id]/RenderBanner";

const page = () => {
  return (
    <section className="md:my-32  my-10 w-[92%] mx-auto">
      {/* blog posts */}
      <h1 className="mb-10 md:text-5xl text-3xl">Latest Articles</h1>
      <div className="md:flex gap-10">
        <div>
          {blogPost.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="cursor-pointer md:flex flex-col py-10 border-t border-gray ">
              <article className="md:flex mb-20 md:mb-0">
                <div className="relative min-w-[300px] h-[250px]">
                  <Image
                    src={post.image}
                    alt="blog image"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:p-4">
                  <h2 className="md:text-5xl text-3xl font-bold mt-4">
                    {post.title}
                  </h2>
                  <p className="text-primaryHover mt-2">{post.date}</p>
                  <p className="text-xl italic mt-4">{post.subtitle}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="md:w-[45%]">
          <img src="/blog/banner.jpg" alt="blog image" />
        </div>
      </div>
    </section>
  );
};

export default page;
