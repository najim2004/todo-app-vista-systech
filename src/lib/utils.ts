import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeOfDayGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function getMotivationalMessage(selectors: { totalTodos: number; activeTodos: number; completedTodos: number; }): string {
  if (selectors.totalTodos === 0) {
    return "Ready to start your productive day?";
  }

  if (selectors.activeTodos === 0 && selectors.completedTodos > 0) {
    return "Amazing! You've completed all your todos!";
  }

  if (selectors.activeTodos === 1) {
    return "Just one more todo to go!";
  }

  if (selectors.activeTodos <= 3) {
    return "You're almost there!";
  }

  return "Let's tackle those todos!";
}
