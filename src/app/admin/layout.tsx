"use client";

import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const { admin_access_token } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    if (!admin_access_token) router.push("/admin/login");
  }, [admin_access_token]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <>
      {isMounted && (
        <div className="flex">
          {admin_access_token && (
            <aside
              className={`${
                isSidebarCollapsed ? "w-[6%]" : "w-[20%]"
              } h-screen fixed duration-500`}>
              <Sidebar
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
              />
            </aside>
          )}
          <main
            className={`${admin_access_token ? "min-w-[75%]" : "w-full"} ${
              isSidebarCollapsed ? "ml-[6%]" : "ml-[20%]"
            } my-10 duration-500`}>
            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default layout;
