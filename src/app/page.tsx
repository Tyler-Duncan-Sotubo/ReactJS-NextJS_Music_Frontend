import HomePage from "./Homepage";
import exchangeRateAPI from "@/hooks/exchangeRateAPI";

export default async function Home() {
  const { getExchangeRate } = exchangeRateAPI();
  const nairaToDollarsRateToday = await getExchangeRate();
  return (
    <>
      <HomePage nairaToDollarsRateToday={nairaToDollarsRateToday} />
    </>
  );
}
