"use client";

import { useState } from "react";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import React from "react";
import { supportFAQ } from "@/data/data";
import {
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaSearch,
} from "react-icons/fa";
import SearchBar from "./SearchBar";

const SupportPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="mt-32 mb-16">
      <h1 className="text-center">Support and Help Center</h1>
      <p className="text-center mt-5">
        Welcome to our support and help center. Here you can find answers to
        common questions.
      </p>

      {/* search bar */}
      <SearchBar />

      {/* FAQ */}
      <article>
        {supportFAQ.map((faq, index) => (
          <div key={index}>
            <div
              className="my-10 border flex-row-between cursor-pointer p-5 rounded-xl w-[90%] md:w-[70%] mx-auto"
              onClick={() =>
                activeIndex === index
                  ? setActiveIndex(null)
                  : setActiveIndex(index)
              }>
              <h3 className="font-bold">{faq.Header}</h3>
              {activeIndex === index ? (
                <FaChevronCircleUp />
              ) : (
                <FaChevronCircleDown />
              )}
            </div>
            {/* FAQ */}
            {activeIndex === index && (
              <div className="animate-slideIn">
                <FrequentlyAskedQuestions faqs={faq.faqs} />
              </div>
            )}
          </div>
        ))}
      </article>
    </section>
  );
};

export default SupportPage;
