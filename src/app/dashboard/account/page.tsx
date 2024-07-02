import RenderUserAccount from "./RenderUserAccount";
import { useFetch } from "@/hooks/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | We Plug Music - Dashboard",
  description:
    "My account page where I can view my account information and update my account details.",
};

const page = async () => {
  const { fetchUserInformation, fetchUser } = useFetch();
  const user = await fetchUser();
  const userInformation: any = await fetchUserInformation();
  return <RenderUserAccount userInformation={userInformation} user={user} />;
};

export default page;
