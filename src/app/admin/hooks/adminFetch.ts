export const adminFetch = () => {
  const fetchUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/users`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data;
  };

  const fetchUserById = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/user/${id}`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data;
  };

  const fetchAudios = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/audios`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data;
  };

  const fetchAudioById = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/audio/${id}`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data;
  };

  const fetchSubscriptions = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/subscriptions`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data;
  };

  const fetchSubscriptionById = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/subscription/${id}`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data;
  };

  return {
    fetchUsers,
    fetchUserById,
    fetchAudios,
    fetchAudioById,
    fetchSubscriptions,
    fetchSubscriptionById,
  };
};
