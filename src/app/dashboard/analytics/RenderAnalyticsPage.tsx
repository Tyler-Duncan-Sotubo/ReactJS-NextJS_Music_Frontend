import { StreamsGraph } from "../graphs/StreamsGraph";

const RenderAnalyticsPage = ({ streams }: any) => {
  const data = streams[0] ?? {};

  // calculate total of all streams
  const sumTotalStreams = (data: any) => {
    let sum = 0;

    // Iterate over each key in the data object
    for (const key in data) {
      if (data[key] && typeof data[key] === "object" && "total" in data[key]) {
        sum += parseInt(data[key]?.total, 10); // Convert string to integer and add to sum
      }
    }

    return sum;
  };

  // Calculate total streams
  const totalStreams = sumTotalStreams(data);

  // Function to format numbers
  function formatNumber(number: number) {
    if (number < 1000) {
      return number?.toString();
    } else {
      return number?.toLocaleString();
    }
  }

  return (
    <>
      {/* Streams and Downloads */}
      <section className="text-center md:mt-44 my-20">
        <h1 className="my-20">My Streams and Downloads</h1>
        <div className="md:h-[400px] md:flex">
          <div className="md:w-[80%]">
            {Object.keys(data).length === 0 ? (
              <section className="relative inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center ">
                <div className="bg-white opacity-70 px-10 flex flex-col gap-6 justify-center items-center py-6 w-[80%] h-[30%] md:w-full md:h-[400px]">
                  <h3 className="text-lg text-center">
                    No downloads reported yet for the last 7 days. Come back
                    later to check again.
                  </h3>
                </div>
              </section>
            ) : (
              <StreamsGraph data={data} />
            )}
          </div>

          <div className="md:w-[25%] text-center flex flex-col gap-3 capitalize">
            <h1 className="text-2xl font-bold text-center my-6">
              Weekly Report
            </h1>
            <div>
              {data?.week_start && (
                <p className="text-sm text-center">
                  {data?.week_start} - {data?.week_end}
                </p>
              )}
            </div>
            <div className="text-3xl text-center mb-4">
              <p className="text-lg">Total Streams</p>
              <h4 className="text-2xl font-bold text-center ">
                {formatNumber(data?.total_streams) ?? 0}
              </h4>
            </div>
            <div className="text-3xl text-center mb-4">
              <p className="text-lg">This Week</p>
              <h4 className="text-2xl font-bold text-center my-2 ">
                {totalStreams}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <table className="table-auto md:w-[60%] my-10">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-4 w-[45%] text-left border-gray-400 bg-gray-200 text-gray-800 ">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.apple.total !== 0 && (
            <tr className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: "black" }}
                  className="w-6 h-1"></div>
                <p>Apple Music</p>
              </td>
              <td className="py-4 text-xl">{formatNumber(data.apple.total)}</td>
            </tr>
          )}
          {data.spotify.total !== 0 && (
            <tr className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: "green" }}
                  className="w-6 h-1"></div>
                <p>Spotify</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(data.spotify.total)}
              </td>
            </tr>
          )}
          {data.youtube.total !== 0 && (
            <tr className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: "red" }}
                  className="w-6 h-1"></div>
                <p>Youtube Music</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(data.youtube.total)}
              </td>
            </tr>
          )}
          {data.tiktok.total !== 0 && (
            <tr className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: "orange" }}
                  className="w-6 h-1"></div>
                <p>Tiktok</p>
              </td>
              <td className="py-4 text-xl">
                {" "}
                {formatNumber(data.tiktok.total)}
              </td>
            </tr>
          )}
          {data.facebook.total !== 0 && (
            <tr className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: "yellow" }}
                  className="w-6 h-1"></div>
                <p>Facebook</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(data.facebook.total)}
              </td>
            </tr>
          )}
          {data.amazon.total !== 0 && (
            <tr className="mb-4 text-lg">
              <td className=" py-4 flex items-center gap-2">
                <div
                  style={{ backgroundColor: "purple" }}
                  className="w-6 h-1"></div>
                <p>Amazon</p>
              </td>
              <td className="py-4 text-xl">
                {formatNumber(data.amazon.total)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default RenderAnalyticsPage;

const headers = ["Store", "Streams"];
