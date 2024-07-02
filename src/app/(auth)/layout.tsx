import AuthCard from "@/app/(auth)/AuthCard";

export const metadata = {
  title: "WePlugMusic",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className="font-sans text-gray-900 antialiased">
        <AuthCard>{children}</AuthCard>
      </div>
    </div>
  );
};

export default Layout;
