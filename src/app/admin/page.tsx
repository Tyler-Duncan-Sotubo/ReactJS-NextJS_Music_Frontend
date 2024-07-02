import RenderAudiosList from "./components/RenderAudiosList";
import RenderSubscriptionsList from "./components/RenderSubscriptionsList";
import RenderUsersList from "./components/RenderUsersList";
import { adminFetch } from "./hooks/adminFetch";

const page = async () => {
  const { fetchUsers, fetchAudios, fetchSubscriptions } = adminFetch();
  const users = await fetchUsers();
  const audios = await fetchAudios();
  const subscriptions = await fetchSubscriptions();

  return (
    <>
      <RenderUsersList users={users} amountToShow={5} />
      <RenderAudiosList audios={audios} amountToShow={5} />
      <RenderSubscriptionsList subscriptions={subscriptions} amountToShow={5} />
    </>
  );
};

export default page;
