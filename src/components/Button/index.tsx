interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, type, disabled }) => {
  return (
    <button
      type={type}
      className={`w-full h-10  self-center bg-p3 text-white rounded flex justify-center items-center gap-2  transition-all hover:opacity-90 uppercase ${
        disabled && "opacity-60"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
