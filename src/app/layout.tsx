import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import PaypalProvider from "@/payments/PaypalProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "We Plug Music",
  description:
    "Music distribution and promotion services for independent artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PaypalProvider>
      <ReduxProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <ToastContainer autoClose={3000} />
          </body>
        </html>
      </ReduxProvider>
    </PaypalProvider>
  );
}
