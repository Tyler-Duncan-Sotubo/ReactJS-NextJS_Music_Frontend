"use client";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaArrowCircleUp,
} from "react-icons/fa";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";

const Footer = () => {
  return (
    <footer className="relative py-16 bg-gradient-to-r from-backgroundTo from-15% via-black via-30%  to-black to-90%  text-white">
      <section className=" w-[90%] mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-[80%]">
          {get_started.map((item, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-6">{item.title}</h3>
              <ul className="flex flex-col gap-3 ">
                {item.links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2 list-none">
                    <Link
                      href={link.href}
                      className="hover:text-primary tracking-wider">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex-row-between mt-20">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
          <div className="flex-row-between gap-6">
            <FaFacebook size={30} />
            <FaTwitter size={30} />
            <FaInstagram size={30} />
          </div>
        </div>
      </section>
      <Scroll
        key="stores"
        activeClass="active"
        to="nav"
        spy={true}
        smooth={true}
        offset={-10}
        duration={500}>
        <div className="absolute top-3 right-0 p-10 cursor-pointer">
          <FaArrowCircleUp size={40} />
        </div>
      </Scroll>
    </footer>
  );
};

export default Footer;

const get_started = [
  {
    title: "Get Started",

    links: [
      {
        href: "/register",
        title: "Sign Up",
      },
      {
        href: "/login",
        title: "Login",
      },
      {
        href: "/pricing",
        title: "Pricing",
      },
    ],
  },
  {
    title: "Services",
    links: [
      {
        href: "/dashboard/music",
        title: "Music Submission",
      },
      {
        href: "/vevo",
        title: "Vevo Channel",
      },
      {
        href: "/promo",
        title: "Music Promotion",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        href: "/support",
        title: "FAQ",
      },
      {
        href: "/terms",
        title: "Terms & Conditions",
      },
      {
        href: "/terms",
        title: "Privacy",
      },
      {
        href: "/blog",
        title: "Blog",
      },
    ],
  },
];
