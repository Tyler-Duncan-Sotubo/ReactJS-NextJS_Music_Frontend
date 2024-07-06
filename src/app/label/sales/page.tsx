import { useLabel } from "@/hooks/label";

interface subscription {
  name: string;
  email: string;
  plan: string;
}

const page = async () => {
  const { fetchSubscriptions } = useLabel();
  const subscriptions = await fetchSubscriptions();
  return (
    <div className="bg-secondary">
      <section className="pt-16 md:pt-36 w-[95%] mx-auto py-12 ">
        <div className="text-center">
          <h2 className="my-6">
            Sales Percentage for All Artists on the Label
          </h2>
          <h5>
            The sales percentage is the percentage of the total sales that the
            artist receives. The percentage is calculated based on the plan the
            artist is on.
          </h5>
        </div>

        {/* sales overview */}
        <section className="my-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:w-[90%] w-full mx-auto">
          <div className="border p-4  bg-white">
            <div className="flex justify-between">
              <h4 className="mb-2">Total Downloads</h4>
              <h4 className="mb-2">% of Downloads</h4>
            </div>
            <div className="flex justify-between">
              <h2>0</h2>
              <h2>£0</h2>
            </div>
          </div>
          <div className="border p-4  bg-white">
            <div className="flex justify-between">
              <h4 className="mb-2">Total Streams</h4>
              <h4 className="mb-2">% of Streams</h4>
            </div>
            <div className="flex justify-between">
              <h2>0</h2>
              <h2>£0</h2>
            </div>
          </div>
          <div className="border p-4  bg-white">
            <h4 className="mb-2">Total Earnings</h4>
            <h2>£0</h2>
          </div>
        </section>

        <table className="w-full rounded-lg bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-4 border-r border-zinc-900">#</th>
              <th className="px-4 py-4">Artist</th>
              <th className="px-4 py-4">Plan</th>
              <th className="px-4 py-4">Sales Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subscriptions) &&
              subscriptions.map((subscription: subscription, index: any) => (
                <tr
                  key={index}
                  className={`${
                    index === subscriptions.length - 1 ? "" : "border-b"
                  }`}>
                  <td className="px-4 py-4 text-center border-r">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-center">{subscription.name}</td>
                  <td className="px-4 py-4 text-center">{subscription.plan}</td>
                  <td className="px-4 py-4 text-center">
                    {subscription.plan === "Gold" ||
                    subscription.plan === "Bronze" ? (
                      <p>8% of 100%</p>
                    ) : (
                      <p>5% of 100%</p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default page;
