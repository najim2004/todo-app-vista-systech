import React, { useReducer, useEffect } from "react";
import {
  type Todo,
  type InsertTodo,
  type FilterType,
  initialState,
  todoReducer,
} from "../lib/todoContextUtils";

import { type TodoContextType } from "../lib/todoContextUtils";
import { TodoContext } from "./TodoContextInstance";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const todos = JSON.parse(savedTodos);
        dispatch({ type: "SET_TODOS", payload: todos });
      } catch (error) {
        console.error("Failed to load todos from localStorage:", error);
      }
    } else {
      dispatch({ type: "SET_TODOS", payload: [] });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  // Filtered todos based on current filter and search query
  const filteredTodos = React.useMemo(() => {
    let filtered = state.todos;

    // Apply filter
    switch (state.filter) {
      case "active":
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case "completed":
        filtered = filtered.filter((todo) => todo.completed);
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply search
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [state.todos, state.filter, state.searchQuery]);

  // Statistics
  const stats = React.useMemo(() => {
    const total = state.todos.length;
    const completed = state.todos.filter((todo) => todo.completed).length;
    const active = total - completed;

    return { total, active, completed };
  }, [state.todos]);

  // Actions
  const addTodo = async (todoData: InsertTodo) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      description: todoData.description || null,
      dueDate: todoData.dueDate || null,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const todo = state.todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo: Todo = {
      ...todo,
      ...updates,
      description:
        updates.description !== undefined
          ? updates.description
          : todo.description,
      dueDate: updates.dueDate !== undefined ? updates.dueDate : todo.dueDate,
      updatedAt: new Date(),
    };
    dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
  };

  const deleteTodo = async (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleTodo = async (id: string) => {
    const todo = state.todos.find((t) => t.id === id);
    if (!todo) return;

    await updateTodo(id, { completed: !todo.completed });
  };

  const clearCompleted = async () => {
    const completedTodos = state.todos.filter((todo) => todo.completed);
    for (const todo of completedTodos) {
      dispatch({ type: "DELETE_TODO", payload: todo.id });
    }
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: "SET_SEARCH", payload: query });
  };

  const value: TodoContextType = {
    state,
    dispatch,
    filteredTodos,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    setFilter,
    setSearchQuery,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
