"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTodo } from "@/contexts/todo-context"

export function SearchBar() {
  const { state, actions } = useTodo()
  const [localQuery, setLocalQuery] = useState(state.searchQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, actions])

  // Sync with global state
  useEffect(() => {
    setLocalQuery(state.searchQuery)
  }, [state.searchQuery])

  const handleClear = () => {
    setLocalQuery("")
    actions.setSearchQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear()
    }
  }

  return (
    <div className="flex-1 max-w-md mx-8 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] w-4 h-4" />
      <Input
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search todos..."
        className="pl-10 pr-10 bg-[#f8fafc] border-[#e2e8f0] rounded-lg"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] hover:text-[#000000] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
