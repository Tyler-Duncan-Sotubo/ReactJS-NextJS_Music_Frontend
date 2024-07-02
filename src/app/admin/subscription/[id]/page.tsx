import { adminFetch } from "../../hooks/adminFetch";
import Update from "./Update";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { fetchSubscriptionById } = adminFetch();
  const subscription = await fetchSubscriptionById(params.id);
  return <Update subscription={subscription} />;
};

export default page;
