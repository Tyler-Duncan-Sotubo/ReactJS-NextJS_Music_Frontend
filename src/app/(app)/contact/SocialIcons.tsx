import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const SocialIcons = () => (
  <div className="flex space-x-4 my-10 gap-3 text-primary">
    <Link href="https://facebook.com" target="_blank" rel="noreferrer noopener">
      <FaFacebook className="text-4xl" />
    </Link>
    <Link href="https://twitter.com" target="_blank" rel="noreferrer noopener">
      <FaTwitter className="text-4xl" />
    </Link>
    <Link
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer noopener">
      <FaInstagram className="text-4xl" />
    </Link>
    <Link href="https://wa.me" target="_blank" rel="noreferrer noopener">
      <FaWhatsapp className="text-4xl" />
    </Link>
  </div>
);

export default SocialIcons;
