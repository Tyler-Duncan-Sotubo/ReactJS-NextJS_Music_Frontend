"use client";

import DashboardNavigation from "./DashboardNavigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { getUser } from "@/redux/slices/authSlice";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import useCheckToken from "@/hooks/useCheckToken";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, access_token } = useAppSelector((state) => state.auth);

  const isTokenExpired = useCheckToken();

  useEffect(() => {
    if (!access_token || isTokenExpired) {
      router.push("/login");
    }

    dispatch(getUser());
  }, [access_token, dispatch]);

  return (
    <>
      <header>
        <DashboardNavigation user={user} />
      </header>
      <main className="md:mt-24 w-[90%] mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default DashboardLayout;
