import { IoChevronDownSharp } from "react-icons/io5";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setCurrencyState } from "@/redux/slices/currencySlice";

const CurrencySelector = () => {
  const currencySelector = useAppSelector((state) => state.currency.currency);
  const [currency, setCurrency] = useState(currencySelector);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="group relative font-bold">
        <div className="flex items-center cursor-pointer gap-2">
          <button className="flex items-center gap-2">
            <span>{currencySelector}</span>
          </button>
          <IoChevronDownSharp className="text-xl" />
        </div>
        <div className="absolute w-16 right-2 hidden group-hover:block bg-white border border-gray rounded-md shadow-lg z-[9999]">
          <div className="flex flex-col justify-center items-center gap-2 p-2">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                if (currency !== "USD") {
                  dispatch(setCurrencyState("USD"));
                  setCurrency("USD");
                } else {
                  setCurrency("NGN");
                  dispatch(setCurrencyState("NGN"));
                }
              }}>
              <span>{currency === "USD" ? "NGN" : "USD"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencySelector;
