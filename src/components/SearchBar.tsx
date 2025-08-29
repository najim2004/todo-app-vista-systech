import { useState } from "react";
import { Search, CircleX, CircleChevronDown } from "lucide-react";
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
    <div className="bg-white rounded-[10px] shadow-md px-6 lg:px-10 py-4 lg:py-[50px]">
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo size={58} />
        </div>

        <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-end">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={state.searchQuery}
                onChange={handleSearchChange}
                className="w-full h-[50px] pl-12 pr-10 py-auto bg-[#F8FAFC] border border-[#E2E8F0] rounded-[6px] focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-[#94A3B8]"
              />
              {state.searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]"
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
            <SelectTrigger className="bg-[#F4F4F5] border border-[#E2E8F0] text-[#000000] rounded-[6px] min-w-[180px] !h-[50px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
