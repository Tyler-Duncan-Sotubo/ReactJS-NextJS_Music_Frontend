import Link from "next/link";

type NavLinkProps = {
  active?: boolean;
  children: React.ReactNode;
  href: string;
};

const NavLink = ({ active = false, children, ...props }: NavLinkProps) => (
  <Link
    {...props}
    className={`inline-flex items-center px-1 py-2 text-sm font-medium leading-5 focus:outline-none transition duration-500 ease-in-out text-black ${
      active
        ? "border-indigo-400 text-gray-900 focus:border-indigo-700 border-b-2 border-primary text-primary"
        : " hover:text-primary hover:border-primary hover:border-b-2 focus:text-gray-700 focus:border-gray-300"
    }`}>
    {children}
  </Link>
);

export default NavLink;
