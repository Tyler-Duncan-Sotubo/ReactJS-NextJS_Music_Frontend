"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

type faq = {
  question: string;
  answer: string | string[];
};

type FAQ = {
  faqs: faq[];
  header?: string;
  className?: string;
};

const FrequentlyAskedQuestions = ({
  faqs,
  header = "",
  className = "",
}: FAQ) => {
  // State
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={`${className} md:w-[70%] mx-auto w-[90%]`}>
      <div>
        <h1 className="text-4xl text-center mt-4 mb-16">{header}</h1>
        {/* FAQ */}
        <div className="flex flex-col justify-center items-center">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-10 w-full">
              <div
                className="flex flex-col justify-between items-center cursor-pointer "
                onClick={() =>
                  activeIndex === index
                    ? setActiveIndex(null)
                    : setActiveIndex(index)
                }>
                <div className="flex justify-between items-center gap-10 border-b px-2 mb-5 w-full">
                  <h2 className="text-lg md:text-2xl my-2 capitalize">
                    {faq.question}
                  </h2>
                  <span className="text-xl">
                    {activeIndex === index ? (
                      <FaChevronDown className="animate-bounce duration-700" />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </div>
                <div
                  className={
                    activeIndex === index ? "animate-slideIn mt-2" : "hidden"
                  }>
                  <div className="text-xl md:text-2xl tracking-wide">
                    {Array.isArray(faq.answer) ? (
                      faq.answer.map((ans, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 my-2">
                          <FaCheck size={20} />
                          <p>{ans}</p>
                        </div>
                      ))
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
