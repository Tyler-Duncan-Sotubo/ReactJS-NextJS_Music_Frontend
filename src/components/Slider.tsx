"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonials } from "@/data/data";
import Image from "next/image";

function Carousel() {
  const settings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode:
            false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-[90%] m-auto overflow-hidden">
      <h1 className="text-4xl font-bold text-center">What Our Artists Say</h1>
      <div className="mt-20">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white min-h-[450px] md:w-2/3 text-black  rounded-xl">
              <div className="relative flex justify-center items-center w-full h-52 rounded-xl">
                <Image
                  src={testimonial.img}
                  alt=""
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-semibold">{testimonial.name}</p>
                <p className="text-center tracking-wider">
                  {testimonial.review}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carousel;
