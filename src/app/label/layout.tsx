"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import LabelNavigation from "./LabelNavigation";
import { getLabel } from "@/redux/slices/labelAuthSlice";
import Footer from "@/components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { label_access_token, label } = useAppSelector(
    (state) => state.labelAuth
  );

  useEffect(() => {
    if (!label_access_token) router.push("/label/login");
    dispatch(getLabel());
  }, [label_access_token, dispatch]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <section>
      <header>
        {isMounted && label_access_token ? (
          <LabelNavigation label={label} />
        ) : null}
      </header>
      <main>{children}</main>
      <footer>{isMounted && label_access_token ? <Footer /> : null}</footer>
    </section>
  );
};

export default layout;
