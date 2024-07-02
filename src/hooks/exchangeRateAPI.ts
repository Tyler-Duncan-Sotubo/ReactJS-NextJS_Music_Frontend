const exchangeRateAPI = () => {
  const getExchangeRate = async () => {
    // set endpoint and your API key
    const endpoint = "convert";
    const access_key = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    // define from currency, to currency, and amount
    const from = "NGN";
    const to = "USD";
    const amount = "1";
    // execute the conversion
    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/${endpoint}?access_key=${access_key}&from=${from}&to=${to}&amount=${amount}`
    );

    const data = await response.json();
    const nairaToDollarsRateToday = data.result;
    return nairaToDollarsRateToday;
  };

  return { getExchangeRate };
};

export default exchangeRateAPI;
