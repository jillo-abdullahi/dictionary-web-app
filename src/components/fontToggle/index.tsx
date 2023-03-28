import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FontType } from "@/containers/Header";

interface FontToggleProps {
  font: FontType;
  toggleFont: (font: FontType) => void;
  theme: string;
}

export const FontToggle: React.FC<FontToggleProps> = ({
  font,
  toggleFont,
  theme,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeOption, setActiveOption] = useState("Sans Serif");

  const dropDownRef = useRef(null);

  const dropDownOptions = [
    { label: "Sans Serif", type: FontType.INTER },
    { label: "Serif", type: FontType.LORA },
    { label: "Mono", type: FontType.INCONSOLATA },
  ];
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //   some styling for the dropdown
  const dropDownBoxShadow =
    theme === "light"
      ? "0px 5px 30px rgba(0, 0, 0, 0.1)"
      : "0px 5px 30px #A445ED";

  // add event listener to close dropdown when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownRef.current &&
      showDropdown &&
      !dropDownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <button
      className="flex items-center justify-center px-7 space-x-5 relative"
      onClick={() => toggleDropdown()}
      ref={dropDownRef}
    >
      <div
        className={`font-bold text-gray-500 ${
          activeOption === "Sans Serif"
            ? FontType.INTER
            : activeOption === "Serif"
            ? FontType.LORA
            : FontType.INCONSOLATA
        }
        ${theme === "light" ? "text-gray-500" : "text-white"}`}
      >
        {activeOption}
      </div>
      <div>
        <Image
          src="/assets/images/icon-arrow-down.svg"
          alt="arrow down"
          width={12}
          height={6}
        />
      </div>

      {/* dropdown  */}
      <div
        className={`absolute top-10 right-6 flex flex-col space-y-4 w-183 rounded-2xl items-start p-6 transition-opacity duration-100  ${
          showDropdown ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow: `${dropDownBoxShadow}`,
        }}
      >
        {dropDownOptions.map((option, index) => {
          return (
            <a
              className={`hover:text-purple transition-all duration-100 ease-in-out font-bold text-lg w-full text-left ${
                option.label === "Sans Serif"
                  ? FontType.INTER
                  : option.label === "Serif"
                  ? FontType.LORA
                  : FontType.INCONSOLATA
              }`}
              key={index}
              onClick={() => {
                setActiveOption(option.label);
                toggleFont(option.type);
                setShowDropdown(false);
              }}
            >
              {option.label}
            </a>
          );
        })}
      </div>
    </button>
  );
};
