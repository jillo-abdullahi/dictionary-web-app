interface InputFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}
export const InputField: React.FC<InputFieldProps> = ({
  handleChange,
  placeholder,
  value,
}) => {
  return (
    <input
      className="border-2 border-gray-200 rounded-md p-2"
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
};
