import terms from "@/data/terms.json";

const page = () => {
  return (
    <section className="w-[80%] mx-auto my-40">
      <h1 className=" mb-16 text-6xl">Terms & Conditions</h1>
      <ul className="list-decimal">
        {terms.map((term, index) => (
          <li key={index} className="text-lg my-5 tracking-wider">
            <p>{term}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default page;
