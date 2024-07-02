import RenderUsersList from "../components/RenderUsersList";
import { adminFetch } from "../hooks/adminFetch";

const page = async () => {
  const { fetchUsers } = adminFetch();
  const users = await fetchUsers();
  return <RenderUsersList users={users} amountToShow={15} />;
};

export default page;
