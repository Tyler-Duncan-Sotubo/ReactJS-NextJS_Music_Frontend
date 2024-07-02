import { cookies } from "next/headers";

type isAuthenticated = {
  name: string;
  value: string;
};

async function getCookies(cookies: any): Promise<isAuthenticated> {
  const token = await cookies().get("session");
  return token;
}

export const useFetch = () => {
  const fetchUser = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuthenticated.value}`,
      },
    });
    const data = await res.json();
    return data;
  };

  // fetch user information
  const fetchUserSubscription = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/subscription/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated.value}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  // fetch user information
  const fetchUserInformation = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/user/account/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated.value}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  // fetch user information
  const fetchUserReleases = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/music/releases`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated?.value}`,
        },
        next: { revalidate: 0 },
      }
    );
    const data = await res.json();
    return data;
  };

  const fetchUserStreams = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}streams/get-all-streams`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isAuthenticated?.value}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  return {
    fetchUser,
    fetchUserSubscription,
    fetchUserInformation,
    fetchUserReleases,
    fetchUserStreams,
  };
};
