"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTodo, type FilterType } from "@/contexts/todo-context"

export function FilterDropdown() {
  const { state, actions, selectors } = useTodo()
  const [isOpen, setIsOpen] = useState(false)

  const filterOptions = [
    { value: "all" as const, label: "All", count: selectors.totalTodos },
    { value: "active" as const, label: "Active", count: selectors.activeTodos },
    { value: "completed" as const, label: "Completed", count: selectors.completedTodos },
  ]

  const currentFilter = filterOptions.find((f) => f.value === state.filter)

  const handleFilterChange = (filter: FilterType) => {
    actions.setFilter(filter)
    setIsOpen(false)
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-[#000000] font-medium hover:bg-[#f8fafc] px-3 py-2 rounded-lg transition-colors"
        >
          <span>{currentFilter?.label}</span>
          <div className="w-6 h-6 rounded-full border-2 border-[#e2e8f0] flex items-center justify-center">
            <div className="w-2 h-2 bg-[#94a3b8] rounded-full"></div>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-[#e2e8f0] py-2 min-w-[140px] z-10">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`w-full text-left px-4 py-2 hover:bg-[#f8fafc] transition-colors flex justify-between items-center ${
                  state.filter === option.value ? "bg-[#f8fafc] text-[#15803d]" : "text-[#000000]"
                }`}
              >
                <span>{option.label}</span>
                <span className="text-[#94a3b8] text-sm">{option.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />}
    </>
  )
}
