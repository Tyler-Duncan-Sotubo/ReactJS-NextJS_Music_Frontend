import Link from "next/link";

type FormDescriptionProps = {
  header: string;
  authQuestion: string;
  path: string;
  pathText: string;
};

const FormDescription = ({
  header,
  authQuestion,
  path,
  pathText,
}: FormDescriptionProps) => (
  <div className="flex-col-center mb-10 gap-2">
    <h2>{header}</h2>
    <div className="flex-row-center gap-2">
      <h4>{authQuestion}</h4>
      <Link
        href={path}
        className="text-sm text-blue-800 font-bold hover:text-blue-600">
        <h4>{pathText}</h4>
      </Link>
    </div>
  </div>
);

export default FormDescription;
