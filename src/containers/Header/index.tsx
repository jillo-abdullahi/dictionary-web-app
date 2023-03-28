import Image from "next/image";
import { FontToggle } from "@/components/fontToggle";
import { ThemeToggle } from "@/components/themeToggle";

export interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}
export const Header: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-center py-4 px-8">
      <div>
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={32}
          height={36.5}
        />
      </div>
      <div className="flex items-center justify-center space-x-5">
        <FontToggle />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};
