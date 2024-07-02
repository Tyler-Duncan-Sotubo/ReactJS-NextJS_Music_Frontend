import Footer from "@/components/Footer";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import SubscriptionPlan from "@/components/SubscriptionPlan";
import { subscriptionPlanToChoose, pricingFAQ } from "@/data/data";
import { FaCircleCheck } from "react-icons/fa6";
import exchangeRateAPI from "@/hooks/exchangeRateAPI";

const GetStartedButton = () => (
  <button className=" text-black py-2 md:px-6 px-2 capitalize md:text-2xl text-xs rounded-3xl border-2 mt-4 ">
    <p>Get Started</p>
  </button>
);

const page = async () => {
  const { getExchangeRate } = exchangeRateAPI();
  const nairaToDollarsRateToday = await getExchangeRate();

  return (
    <>
      <section>
        <div className="flex justify-center items-center">
          <h1 className="text-7xl text-center mt-10 mb-10">Pricing</h1>
        </div>
        <section className="w-[90%] mx-auto">
          <SubscriptionPlan
            header="Choose the Right Plan for Your Music Distribution"
            nairaToDollarsRateToday={nairaToDollarsRateToday}
          />
        </section>

        {/* Frequently Asked Questions For Pricing */}
        <FrequentlyAskedQuestions
          faqs={pricingFAQ}
          header="Frequently Asked Questions"
        />

        {/* Subscription Plan To Choose */}
        <article className="py-16  text-black min-h-screen ">
          <div className="w-[95%] mx-auto">
            <h1 className="text-2xl md:text-5xl text-center mt-4 mb-16">
              Which Plan is Perfect for You?
            </h1>
            <div className="flex justify-between my-10 gap-2">
              <h3 className="text-2xl font-bold w-[35%]"></h3>
              <div className="flex flex-col justify-center items-center">
                <h3 className="md:text-2xl text-sm font-bold">Silver Plan</h3>
                <GetStartedButton />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h3 className="md:text-2xl text-sm font-bold">Gold Plan</h3>
                <GetStartedButton />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h3 className="md:text-2xl text-sm font-bold">Platinum Plan</h3>
                <GetStartedButton />
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              {subscriptionPlanToChoose.map((item, index) => (
                <div
                  key={index}
                  className="border-b py-3 border-b-zinc-900 flex justify-between">
                  <h3 className="w-[35%]">{item.feature}</h3>
                  {item.includes.map((include, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 w-[5%] ${
                        index === 2 ? "mr-12" : ""
                      }`}>
                      <p>
                        {include === "yes" ? <FaCircleCheck size={30} /> : ""}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default page;
