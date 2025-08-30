import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("todo-theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const shouldBeDark =
        savedTheme === "dark" || (!savedTheme && prefersDark);

      setIsDark(shouldBeDark);
      document.documentElement.classList.toggle("dark", shouldBeDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("todo-theme", newTheme ? "dark" : "light");
  };

  return (
    <div className="fixed bottom-4 lg:top-4 right-4 z-50">
      <Button
        variant="default"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative bg-accent hover:bg-accent/90 text-accent-foreground border-0 w-12 h-12 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {isDark ? (
            <MoonIcon className="h-5 w-5 transition-all duration-300 ease-in-out" />
          ) : (
            <SunIcon className="h-5 w-5 transition-all duration-300 ease-in-out" />
          )}
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
