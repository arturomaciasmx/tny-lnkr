import { Moon, Sun } from "lucide-react";

export default function Header({
  setIsDark,
  isDark,
}: {
  setIsDark: any;
  isDark: boolean;
}) {
  const toggleDarkMode = () => {
    console.log("change");
    setIsDark(!isDark);
  };
  return (
    <div className="p-5 flex justify-end mb-14">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-border/10 dark:bg-light/10 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? (
          <Sun className="text-yellow-400" />
        ) : (
          <Moon className="text-gray-800 dark:text-gray-200" />
        )}
      </button>
    </div>
  );
}
