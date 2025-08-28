"use client"

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  dueDate?: Date
}

export type FilterType = "all" | "active" | "completed"

export interface TodoState {
  todos: Todo[]
  filter: FilterType
  searchQuery: string
  isLoading: boolean
}

export type TodoAction =
  | { type: "ADD_TODO"; payload: Omit<Todo, "id" | "createdAt"> }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "EDIT_TODO"; payload: { id: string; updates: Partial<Pick<Todo, "title" | "description" | "dueDate">> } }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_TODOS"; payload: Todo[] }

import { initialState, todoReducer } from "./todo-reducer"

interface TodoContextType {
  state: TodoState
  actions: {
    addTodo: (todo: Omit<Todo, "id" | "createdAt">) => void
    toggleTodo: (id: string) => void
    editTodo: (id: string, updates: Partial<Pick<Todo, "title" | "description" | "dueDate">>) => void
    deleteTodo: (id: string) => void
    clearCompleted: () => void
    setFilter: (filter: FilterType) => void
    setSearchQuery: (query: string) => void
    setLoading: (loading: boolean) => void
  }
  selectors: {
    filteredTodos: Todo[]
    totalTodos: number
    completedTodos: number
    activeTodos: number
    searchResults: number
  }
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos")
      const savedFilter = localStorage.getItem("todoFilter") as FilterType

      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }))
        dispatch({ type: "LOAD_TODOS", payload: parsedTodos })
      }

      if (savedFilter) {
        dispatch({ type: "SET_FILTER", payload: savedFilter })
      }
    } catch (error) {
      console.warn("Failed to load from localStorage:", error)
    }
  }, [])

  const actions = {
    addTodo: (todo: Omit<Todo, "id" | "createdAt">) => {
      dispatch({ type: "ADD_TODO", payload: todo })
    },
    toggleTodo: (id: string) => {
      dispatch({ type: "TOGGLE_TODO", payload: id })
    },
    editTodo: (id: string, updates: Partial<Pick<Todo, "title" | "description" | "dueDate">>) => {
      dispatch({ type: "EDIT_TODO", payload: { id, updates } })
    },
    deleteTodo: (id: string) => {
      dispatch({ type: "DELETE_TODO", payload: id })
    },
    clearCompleted: () => {
      dispatch({ type: "CLEAR_COMPLETED" })
    },
    setFilter: (filter: FilterType) => {
      dispatch({ type: "SET_FILTER", payload: filter })
    },
    setSearchQuery: (query: string) => {
      dispatch({ type: "SET_SEARCH_QUERY", payload: query })
    },
    setLoading: (loading: boolean) => {
      dispatch({ type: "SET_LOADING", payload: loading })
    },
  }

  const selectors = React.useMemo(() => {
    let searchFilteredTodos = state.todos
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase().trim()
      searchFilteredTodos = state.todos.filter((todo) => {
        return (
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
        )
      })
    }

    const filteredTodos = searchFilteredTodos.filter((todo) => {
      switch (state.filter) {
        case "active":
          return !todo.completed
        case "completed":
          return todo.completed
        default:
          return true
      }
    })

    return {
      filteredTodos,
      totalTodos: state.todos.length,
      completedTodos: state.todos.filter((todo) => todo.completed).length,
      activeTodos: state.todos.filter((todo) => !todo.completed).length,
      searchResults: searchFilteredTodos.length,
    }
  }, [state.todos, state.filter, state.searchQuery])

  const value = {
    state,
    actions,
    selectors,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodo() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider")
  }
  return context
}
