import { cookies } from "next/headers";

type isAuthenticated = {
  name: string;
  value: string;
};

async function getCookies(cookies: any): Promise<isAuthenticated> {
  const token = await cookies().get("label_session");
  return token;
}

export const useLabel = () => {
  const fetchLabel = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/label/`,
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

  const fetchArtists = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/label/artists`,
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

  const fetchSubscriptions = async () => {
    const isAuthenticated = await getCookies(cookies);
    if (!isAuthenticated) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/label/subscriptions`,
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

  return {
    fetchLabel,
    fetchArtists,
    fetchSubscriptions,
  };
};
