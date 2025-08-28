"use client"

import { useTodo } from "@/contexts/todo-context"
import { TodoItem } from "./todo-item"

export function TodoList() {
  const { selectors, state } = useTodo()

  if (state.isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-[#e2e8f0] rounded"></div>
              <div className="flex-1">
                <div className="h-5 bg-[#e2e8f0] rounded mb-2"></div>
                <div className="h-4 bg-[#e2e8f0] rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (selectors.filteredTodos.length === 0) {
    const getEmptyMessage = () => {
      const hasSearch = state.searchQuery.trim().length > 0

      if (hasSearch) {
        if (state.filter === "all") {
          return `No todos found matching "${state.searchQuery}". Try a different search term.`
        } else {
          return `No ${state.filter} todos found matching "${state.searchQuery}". Try adjusting your search or filter.`
        }
      }

      switch (state.filter) {
        case "active":
          return selectors.totalTodos === 0
            ? "No todos yet. Add your first todo to get started!"
            : "No active todos. Great job staying on top of things!"
        case "completed":
          return selectors.totalTodos === 0
            ? "No todos yet. Add some todos to see completed ones here."
            : "No completed todos yet. Keep working on your tasks!"
        default:
          return "No todos yet. Add your first todo to get started!"
      }
    }

    const getEmptyTitle = () => {
      const hasSearch = state.searchQuery.trim().length > 0

      if (hasSearch) {
        return "No results found"
      }

      if (state.filter === "all") {
        return "No todos yet"
      } else {
        return `No ${state.filter} todos`
      }
    }

    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
        <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-[#e2e8f0] rounded"></div>
        </div>
        <h3 className="text-lg font-semibold text-[#000000] mb-2">{getEmptyTitle()}</h3>
        <p className="text-[#94a3b8] text-sm max-w-md mx-auto">{getEmptyMessage()}</p>
        {state.searchQuery.trim() && (
          <p className="text-[#94a3b8] text-xs mt-2">
            Showing {selectors.searchResults} of {selectors.totalTodos} total todos
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search results indicator */}
      {state.searchQuery.trim() && (
        <div className="text-sm text-[#94a3b8] mb-4">
          Found {selectors.filteredTodos.length} result{selectors.filteredTodos.length !== 1 ? "s" : ""} for "
          {state.searchQuery}"
        </div>
      )}

      {selectors.filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
