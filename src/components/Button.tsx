type ButtonProps = {
  type?: "submit" | "reset" | "button";
  className?: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  type = "submit",
  className,
  color = "text-white",
  onClick,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${className} ${color} text-[.8rem] inline-flex items-center px-10 py-3 bg-primary 
                 rounded-lg font-semibold uppercase tracking-widest hover:bg-blue-500 hover:text-white hover:bg-primaryHover
                 active:bg-primaryHover focus:outline-none focus:ring ring-primaryHover disabled:opacity-25
                 transition ease-in-out duration-300`}
    {...props}
    onClick={onClick}>
    {props.children}
  </button>
);

export default Button;
