interface InputProps {
  label: string;
  name: string;
  type: string;
  disabled?: boolean;
  onChange: (event: any) => void;
}

const Input: React.FC<InputProps> = ({ label, name, type, disabled, onChange }) => {
  return (
    <>
      <label className="text-c5 font-medium ">{label}</label>
      <input name={name} type={type} disabled={disabled} className="w-full h-full bg-c1 rounded pl-2" onChange={onChange} />
    </>
  );
};

export default Input;
