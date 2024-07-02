import RenderDashboard from "./RenderDashboard";
import { useFetch } from "@/hooks/fetch";

const Dashboard = async () => {
  const { fetchUserReleases, fetchUser, fetchUserSubscription } = useFetch();

  const userReleases = await fetchUserReleases();
  const userSubscription = await fetchUserSubscription();
  const user = await fetchUser();

  return (
    <>
      <RenderDashboard
        userReleases={userReleases}
        userSubscription={userSubscription}
        user={user}
      />
    </>
  );
};

export default Dashboard;
