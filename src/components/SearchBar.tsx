import { useState } from "react";
import { Search, CircleX } from "lucide-react";
import Logo from "./Logo";
import { useTodos } from "@/hooks/useTodos";
import type { FilterType } from "@/lib/todoContextUtils";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function SearchBar() {
  const { state, setFilter, setSearchQuery } = useTodos();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    state.filter
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleFilterSelect = (filter: FilterType) => {
    setFilter(filter);
    setSelectedFilter(filter);
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-md px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-[50px] border border-border">
      {/* Mobile Layout */}
      <div className="block sm:hidden space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo size={48} />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={state.searchQuery}
            onChange={handleSearchChange}
            className="w-full h-[45px] pl-12 pr-10 bg-background border-border rounded-[6px] focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground placeholder:text-muted-foreground"
          />
          {state.searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <CircleX size={18} />
            </button>
          )}
        </div>

        {/* Filter Select */}
        <Select
          value={selectedFilter}
          onValueChange={(value: FilterType) => handleFilterSelect(value)}
        >
          <SelectTrigger className="bg-card border-border text-card-foreground rounded-[6px] w-full h-[45px] hover:bg-muted transition-colors">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem
              value="all"
              className="text-card-foreground hover:bg-muted focus:bg-muted focus:text-card-foreground"
            >
              All
            </SelectItem>
            <SelectItem
              value="active"
              className="text-card-foreground hover:bg-muted focus:bg-muted focus:text-card-foreground"
            >
              Active
            </SelectItem>
            <SelectItem
              value="completed"
              className="text-card-foreground hover:bg-muted focus:bg-muted focus:text-card-foreground"
            >
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo size={58} />
        </div>

        <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={state.searchQuery}
                onChange={handleSearchChange}
                className="w-full h-[50px] pl-12 pr-10 py-auto bg-background border-border rounded-[6px] focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
              {state.searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <CircleX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Select */}
          <Select
            value={selectedFilter}
            onValueChange={(value: FilterType) => handleFilterSelect(value)}
          >
            <SelectTrigger className="bg-card border-border text-card-foreground rounded-[6px] min-w-[180px] !h-[50px] hover:bg-muted transition-colors">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem
                value="all"
                className="text-card-foreground hover:bg-muted focus:bg-muted"
              >
                All
              </SelectItem>
              <SelectItem
                value="active"
                className="text-card-foreground hover:bg-muted focus:bg-muted"
              >
                Active
              </SelectItem>
              <SelectItem
                value="completed"
                className="text-card-foreground hover:bg-muted focus:bg-muted"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
