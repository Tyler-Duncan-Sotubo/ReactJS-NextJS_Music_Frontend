import React from "react";
import { adminFetch } from "../../hooks/adminFetch";
import UpdateUser from "./UpdateUser";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { fetchUserById } = adminFetch();
  const user = await fetchUserById(params.id);
  return <UpdateUser user={user} />;
};

export default page;
