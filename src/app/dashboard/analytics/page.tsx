import RenderAnalyticsPage from "./RenderAnalyticsPage";
import { useFetch } from "@/hooks/fetch";
import { Metadata } from "next";
import RenderAnalyticsDemo from "./RenderAnalyticsDemo";

export const metadata: Metadata = {
  title: "Analytics | We Plug Music - Dashboard",
  description:
    "Sales and analytics page where I can view my sales and analytics data.",
};

const page = async () => {
  const { fetchUserSubscription, fetchUserStreams } = useFetch();
  const userSubscription = await fetchUserSubscription();
  const streams = await fetchUserStreams();

  if (userSubscription?.status === "active") {
    return <RenderAnalyticsPage streams={streams} />;
  } else {
    return <RenderAnalyticsDemo />;
  }
};

export default page;
