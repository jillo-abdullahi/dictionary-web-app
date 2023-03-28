import Image from "next/image";
import { ThemeToggleProps } from "@/containers/Header";

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <div className="flex space-x-5 items-center">
      {/* toggle switch  */}
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <span className="slider round"></span>
      </label>
      {/* moon icon  */}
      <div>
        <Image
          src={`${
            theme === "light"
              ? "/assets/images/icon-moon.svg"
              : "/assets/images/icon-moon-dark-mode.svg"
          }`}
          alt="logo"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
