import ApplicationLogo from "@/components/ApplicationLogo";
import Button from "@/components/Button";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Navigation from "../Navigation";

type SupportLayoutProps = {
  children: React.ReactNode;
};

const SupportLayout = ({ children }: SupportLayoutProps) => {
  return (
    <>
      <header>
        <Navigation />
      </header>

      {/* children */}
      <main>{children}</main>
      <footer className="flex flex-col justify-center items-center mt-44 mb-20">
        <Link href="/">
          <ApplicationLogo className="w-16 h-16" />
        </Link>
        <p className="text-center mt-10">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </p>
        <div className="flex-row-between gap-1 mt-3">
          <Link href="/terms">
            <p>Terms of Service</p>
          </Link>
          <span className="mx-2">|</span>
          <Link href="/privacy">
            <p>Privacy Policy</p>
          </Link>
        </div>
        <div className="flex-row-between mt-6 gap-4">
          <FaFacebook size={30} />
          <FaTwitter size={30} />
          <FaInstagram size={30} />
        </div>
      </footer>
    </>
  );
};

export default SupportLayout;
