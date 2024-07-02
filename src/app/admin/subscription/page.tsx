import RenderSubscriptionsList from "../components/RenderSubscriptionsList";
import { adminFetch } from "../hooks/adminFetch";

const page = async () => {
  const { fetchSubscriptions } = adminFetch();
  const subscriptions = await fetchSubscriptions();
  return (
    <RenderSubscriptionsList subscriptions={subscriptions} amountToShow={15} />
  );
};

export default page;
