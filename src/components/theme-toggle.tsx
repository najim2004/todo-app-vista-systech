"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-border bg-transparent hover:bg-muted transition-all duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 transition-transform duration-200 hover:scale-110" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-200 hover:scale-110" />
      )}
    </Button>
  );
}
