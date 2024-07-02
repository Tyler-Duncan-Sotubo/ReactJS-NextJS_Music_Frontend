"use client";

import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hooks/hooks";

type VerifySubscriptionModalProps = {
  showModal: boolean;
  userSubscription: any;
  pageTitle: string;
};

const VerifySubscriptionModal = ({
  showModal,
  userSubscription,
  pageTitle,
}: VerifySubscriptionModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      {/* Subscription Modal */}
      {showModal && (
        <section className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          {userSubscription?.status === "unpaid" ? (
            <div className="bg-white px-10 flex flex-col gap-6 justify-center items-center py-6 w-[80%] h-[30%] md:w-[40%] md:h-[30%] rounded-2xl">
              <h3 className="text-lg">Please Make Payment to {pageTitle}</h3>
              <p className="px-3 py-4 w-full text-center bg-secondary">
                We sent you an email to "{user.email}" to make payment
              </p>
              <Link
                className="flex-row-between gap-2 cursor-pointer"
                href="/dashboard">
                <FaArrowLeftLong size={20} className="text-primary" />
                <p>Go Back</p>
              </Link>
            </div>
          ) : (
            <div className="bg-white px-10 flex flex-col gap-6 justify-center items-center py-6 w-[80%] h-[30%] md:w-[40%] md:h-[30%] rounded-2xl">
              <h3 className="text-lg text-center capitalize">
                You need to subscribe to upload music
              </h3>
              <Link href="/dashboard/subscription">
                <button className="px-3 py-4 w-full text-center text-white bg-primary">
                  Subscribe Now
                </button>
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default VerifySubscriptionModal;
