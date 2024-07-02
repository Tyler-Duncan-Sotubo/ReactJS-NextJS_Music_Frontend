import RenderSubscriptionPage from "./RenderSubscriptionPage";
import { useFetch } from "@/hooks/fetch";
import exchangeRateAPI from "@/hooks/exchangeRateAPI";
const page = async () => {
  // fetch exchange rate
  const { getExchangeRate } = exchangeRateAPI();
  const nairaToDollarsRateToday = await getExchangeRate();

  // fetch user subscription
  const { fetchUserSubscription } = useFetch();
  const userSubscription = await fetchUserSubscription();

  // return
  return (
    <RenderSubscriptionPage
      userSubscription={userSubscription}
      nairaToDollarsRateToday={nairaToDollarsRateToday}
    />
  );
};

export default page;
