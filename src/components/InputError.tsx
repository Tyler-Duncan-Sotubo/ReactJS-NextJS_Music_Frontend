type InputErrorProps = {
  message?: string | null;
  className?: string;
};

const InputError = ({ message = "", className = "" }: InputErrorProps) => (
  <p className={`${className} text-sm font-bold  text-error`}>{message}</p>
);

export default InputError;
