"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { resendVerificationEmail } from "@/redux/slices/authSlice";

const RenderDashboard = ({ userReleases, userSubscription, user }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { emailVerificationStatus } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
    router.refresh();
    return () => {
      setIsMounted(false);
    };
  }, []);

  type ReleaseMobileView = {
    release: string | any;
    description: string;
  };

  const RenderMobileViewReleaseDetails = ({
    release,
    description,
  }: ReleaseMobileView) => (
    <div className="my-4">
      <h5 className="uppercase font-medium">{description}</h5>
      <p className="font-bold">{release}</p>
    </div>
  );

  return (
    <>
      {/* Subscription Plan */}
      <section className="flex flex-col md:flex-row justify-between gap-6 md:gap-3 mt-12 md:mt-44">
        {/* Welcome Message for user */}
        <p className="text-black text-2xl mb-4 md:hidden">
          Welcome, {user?.name}
        </p>
        <div className="md:w-1/2 capitalize">
          <h1 className="text-5xl md:text-7xl tracking-wider leading-tight mb-5 font-semibold">
            track and control your subscription
          </h1>
          <h4>
            From your account dashboard you can view your recent releases,
            manage your account details, edit your
            <Link
              href="/forgot-password"
              className="text-primary mx-1 font-bold">
              password
            </Link>
            track your
            <Link
              href="/dashboard/sales"
              className="text-primary mx-1 font-bold">
              royalties
            </Link>
            and your request for
            <Link
              href="/dashboard/payout"
              className="text-primary mx-1 font-bold">
              payout
            </Link>
            .
          </h4>
        </div>
        <div className="md:w-[40%] h-72 p-10 bg-white shadow-md">
          <h2 className="mb-8 font-semibold">Your Subscription</h2>
          {userSubscription?.status === "active" && isMounted ? (
            <div className="font-medium ">
              <div className="text-lg my-4 font-medium tracking-wider">
                {userSubscription.plan === "Bronze" ? (
                  <p>
                    You are currently on the
                    <span className="font-bold"> Bronze plan</span>
                  </p>
                ) : userSubscription.plan === "Gold" ? (
                  <p>
                    You are currently on the
                    <span className="font-bold"> Gold plan</span>
                  </p>
                ) : (
                  <p>
                    You are currently on the
                    <span className="font-bold"> Platinum plan</span>
                  </p>
                )}
              </div>
              <div className="w-2/3">
                <p className="text-lg my-4 font-medium tracking-wide">
                  Your subscription will expire on
                  <span className="font-bold">
                    {" "}
                    {userSubscription.expiresAt?.slice(0, 10)}
                  </span>
                </p>
              </div>
            </div>
          ) : userSubscription?.status === "unpaid" && isMounted ? (
            <div>
              <h5 className="text-lg my-4 font-semibold">
                Your subscription has not been paid for, please check your email
                for payment details
              </h5>
              <p className="bg-error text-white  inline-block p-5">
                <p className="text-[14px] uppercase font-semibold ">
                  Payment Pending
                </p>
              </p>
            </div>
          ) : (
            <div>
              <h5 className="text-lg my-4 font-semibold">
                You don't have a subscription plan yet, please subscribe to a
                plan
              </h5>
              <Link href="/dashboard/subscription">
                <Button className="bg-primary text-white hover:bg-primaryHover">
                  <p className="text-[14px]">Get Started</p>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Email Verification Warning */}
      {!user?.email_verified && isMounted ? (
        <div className="text-center bg-secondary px-2 py-3 rounded-lg mt-10">
          <div>
            {emailVerificationStatus === "successful" && (
              <p className="mb-3">Email Verification sent</p>
            )}
          </div>
          <div className=" md:flex justify-center items-center gap-10 ">
            <p>
              Your email is not verified, please check your email for
              verification link
            </p>
            <Button
              onClick={() => dispatch(resendVerificationEmail(user.email))}
              className="bg-primary text-[10px] text-white hover:bg-primaryHover md:mt-0 mt-3">
              Verify Email
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-2 py-3 mb-5" />
      )}

      {/* header */}
      <div className="flex-row-between items-center mt-20 mb-10">
        <h2 className="text-sm md:text-2xl">Recent Release</h2>
        {/* create new release button */}
        <Link href="/dashboard/music">
          <Button className="bg-primary text-white hover:bg-primaryHover text-xs">
            Create New Release
          </Button>
        </Link>
      </div>

      {/* Table body  */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200 text-[14px] capitalize mb-32 ">
          <thead className="font-regular bg-white uppercase text-purple">
            <tr>
              <th className="text-left p-4 capitalize"></th>
              <th className="text-left p-4 capitalize">Title</th>
              <th className="text-left p-4 capitalize">Release Type</th>
              <th className="text-left p-4 capitalize">Status</th>
              <th className="text-left p-4 capitalize">Release Date</th>
              <th className="text-left p-4 capitalize">ISRC</th>
              <th className="text-left p-4 capitalize">UPC</th>
              <th className="text-left p-4 capitalize">SmartLink</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 capitalize">
            {Array.isArray(userReleases) ? (
              userReleases.map((release, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={release.releaseCover}
                      alt="cover art"
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="px-4 py-6 whitespace-nowrap font-bold">
                    <p>{release.title}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-bold">
                    <p>{release.releaseType}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-bold">
                    {release.status === "pending" ||
                    release.status.includes("REQUIRES REPAIR") ? (
                      <p className="text-error">{release.status}</p>
                    ) : (
                      <p className=" text-green-600">{release.status}</p>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-bold">
                    <p>{release.releaseDate?.slice(0, 10)}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-bold">
                    <p>{release.ISRC === "" ? "N/A" : release.ISRC}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-bold">
                    <p>{release.UPC === "" ? "N/A" : release.UPC}</p>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap font-bold">
                    {release.smartLink === "" ? (
                      "N/A"
                    ) : (
                      <Link href={release.smartLink} target="_blank">
                        <Button
                          className="bg-white border-primary hover:text-white border-2 px-10"
                          color="text-black">
                          Smartlink
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-xl whitespace-nowrap font-bold text-center">
                  <p>No Release yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden my-10">
        {Array.isArray(userReleases) ? (
          userReleases.map((release, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-xl rounded-xl p-3 mb-4 my-10">
              <img
                src={release.releaseCover}
                alt="cover art"
                className="w-[400px]  object-contain rounded-lg mb-10"
              />
              <div className="flex flex-col capitalize">
                <RenderMobileViewReleaseDetails
                  release={release.title}
                  description="song title"
                />
                <RenderMobileViewReleaseDetails
                  release={
                    release.status === "pending" ? (
                      <span className="text-error">{release.status}</span>
                    ) : (
                      <span className=" text-green-600">{release.status}</span>
                    )
                  }
                  description="Release Status"
                />
                <RenderMobileViewReleaseDetails
                  release={release.releaseType}
                  description="Release Type"
                />
                <RenderMobileViewReleaseDetails
                  release={release.ISRC === "" ? "N/A" : release.ISRC}
                  description="ISRC Code"
                />
                <RenderMobileViewReleaseDetails
                  release={release.UPC === "" ? "N/A" : release.UPC}
                  description="UPC Code"
                />
                <RenderMobileViewReleaseDetails
                  release={release.createdAt?.slice(0, 10)}
                  description="Received on"
                />
                <RenderMobileViewReleaseDetails
                  release={release.releaseDate?.slice(0, 10)}
                  description="Release Date"
                />
                <div>
                  <h5 className="uppercase font-medium my-5">SmartLink</h5>
                  {release.smartLink === "" ? (
                    "N/A"
                  ) : (
                    <Link href={release.smartLink} target="_blank">
                      <Button
                        className="bg-white border-primary hover:text-white border-2 px-10"
                        color="text-black">
                        Smartlink
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center bg-white shadow-md p-4 mb-4">
            <h3 className="text-center font-bold">No Release yet</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default RenderDashboard;
