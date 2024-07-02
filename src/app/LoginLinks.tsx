"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useLayoutEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import useCheckToken from "@/hooks/useCheckToken";

const LoginLinks = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const isTokenExpired = useCheckToken();

  useLayoutEffect(() => {
    setIsMounted(true);
  }, [dispatch]);

  return (
    <div className="flex items-center gap-5 relative">
      <div className="">
        {isTokenExpired && isMounted ? (
          <>
            <Link href="/login">
              <Button
                className="bg-white border-primary hover:text-white border-2"
                color="text-black">
                Login
              </Button>
            </Link>
            <Link href="/register" className="ml-4 ">
              <Button>Sign Up</Button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginLinks;
