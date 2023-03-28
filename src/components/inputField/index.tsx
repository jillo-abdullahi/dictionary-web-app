import Image from "next/image";

interface InputFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  value: string;
  error: string;
  font: string;
  theme: string;
}
export const InputField: React.FC<InputFieldProps> = ({
  handleChange,
  handleSubmit,
  placeholder,
  value,
  error,
  theme,
  font,
}) => {

    console.log({error})
  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <input
        className={`w-full outline-none outline-offset-0 border-0 bg-gray-100  py-5 px-6 rounded-2xl hover p-2 placeholder-gray-500 font-bold text-xl placeholder-opacity-25 ${
          theme === "light"
            ? "text-gray-500 bg-gray-100 placeholder-gray-500"
            : "text-white bg-gray-600 placeholder-white"
        } ${font}
        ${
          error
            ? "outline-red outline-1 border-2"
            : "hover:outline-1 hover:outline-purple focus:outline-purple focus:outline-1"
        }`}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <div className="absolute top-0 right-6 h-full flex items-center justify-center">
        <button type="submit">
          <Image
            src="/assets/images/icon-search.svg"
            alt="search"
            width={16}
            height={16}
          />
        </button>
      </div>
      {error && (
        <span className="font-normal text-red text-sm mt-2">
          Whoops, can’t be empty...
        </span>
      )}
    </form>
  );
};
