"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logoutOnTokenExpire } from "@/redux/slices/authSlice";

const useCheckToken = () => {
  const token = Cookies.get("session");
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      const decodedJwt = jwtDecode(token);
      if (decodedJwt.exp && decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logoutOnTokenExpire());
        Cookies.remove("session");
        setIsTokenExpired(true);
      } else {
        setIsTokenExpired(false);
      }
    } else {
      setIsTokenExpired(true);
    }
  }, [isTokenExpired, token]);

  return isTokenExpired;
};

export default useCheckToken;
