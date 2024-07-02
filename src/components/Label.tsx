type LabelProps = {
  className?: string;
  children: React.ReactNode;
  htmlFor: string;
};

const Label = ({ className, children, htmlFor, ...props }: LabelProps) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700 mb-2`}
    {...props}>
    {children}
  </label>
);

export default Label;
