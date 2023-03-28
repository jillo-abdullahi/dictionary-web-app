import Image from "next/image";
import { FontToggle } from "@/components/fontToggle";
import { ThemeToggle } from "@/components/themeToggle";

export enum FontType {
  INTER = "font-inter",
  LORA = "font-lora",
  INCONSOLATA = "font-inconsolata",
}

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  font: FontType;
  toggleFont: (font: FontType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  font,
  toggleFont,
}) => {
  return (
    <header className="flex justify-between items-center py-4 px-8 w-full">
      <div>
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={32}
          height={36.5}
        />
      </div>
      <div
        className={`flex items-center justify-center divide-x divide-gray-200`}
      >
        <FontToggle font={font} toggleFont={toggleFont} theme={theme} />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};
