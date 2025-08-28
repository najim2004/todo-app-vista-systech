"use client";

import { useTodo } from "@/contexts/todo-context";
import { SearchBar } from "./search-bar";
import { FilterDropdown } from "./filter-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { getTimeOfDayGreeting, getMotivationalMessage } from "../lib/utils";

export function AppHeader() {
  const { state, selectors } = useTodo();

  
  return (
    <div className="bg-card rounded-2xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded transform rotate-45"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Todo Master</h1>
            <p className="text-sm text-muted-foreground">
              {getTimeOfDayGreeting()}! {getMotivationalMessage(selectors)}
            </p>
          </div>
        </div>

        <SearchBar />

        <div className="flex items-center gap-4">
          {state.searchQuery && (
            <div className="text-sm text-muted-foreground hidden md:block">
              {selectors.filteredTodos.length} of {selectors.totalTodos} todos
            </div>
          )}

          <FilterDropdown />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
