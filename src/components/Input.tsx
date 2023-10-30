interface InputProps {
  label?: string;
  placeholder?: string;
  value?: any;
  name: string;
  type: string;
  disabled?: boolean;
  onChange: (event: any) => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder, name, type, value, disabled, onChange }) => {
  return (
    <>
      {label && <label className="w-36 text-c5 font-medium shrink-0 ">{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className="w-full h-full bg-c1 rounded pl-2 outline-none"
        onChange={onChange}
      />
    </>
  );
};

export default Input;
