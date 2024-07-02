import { adminFetch } from "../../hooks/adminFetch";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { fetchSubscriptionById } = adminFetch();
  const subscription = await fetchSubscriptionById(params.id);
  console.log(subscription);
  return <div>{params.id}</div>;
};

export default page;
