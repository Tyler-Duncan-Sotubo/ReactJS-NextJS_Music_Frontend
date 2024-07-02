type InputProps = {
  disabled?: boolean;
  className?: string;
  name: string;
  register: any;
  error?: string;
  id: string;
  type: string;
  placeholder?: string;
};

const TextInput = ({
  disabled = false,
  className,
  register,
  name,
  error,
  ...rest
}: InputProps) => (
  <div className="mb-6 relative">
    <input
      className={`${className} w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 
        focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-secondary`}
      {...register(name)}
      {...rest}
    />
    {error && (
      <span
        role="alert"
        className="text-error text-sm my-2 text-bold"
        aria-label="error-message">
        {error}
      </span>
    )}
  </div>
);

export default TextInput;
