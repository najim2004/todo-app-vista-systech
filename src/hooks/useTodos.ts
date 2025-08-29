import { useContext } from "react";
import { type TodoContextType } from "../lib/todoContextUtils";
import { TodoContext } from "../contexts/TodoContextInstance";

export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}
