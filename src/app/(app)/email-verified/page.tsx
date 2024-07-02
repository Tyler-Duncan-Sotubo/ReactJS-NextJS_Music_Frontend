import Button from "@/components/Button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center my-44 gap-6 text-center w-[90%] mx-auto">
      <div></div>
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52">
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <h1 className="text-4xl font-bold text-center">Verified!</h1>
      <p className="text-2xl mt-2">
        You have successfully verified your email address.
      </p>
      <div className="mt-4">
        <Link href="/dashboard">
          <Button
            className="bg-white border-primary hover:text-white border-2"
            color="text-black">
            Your Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
