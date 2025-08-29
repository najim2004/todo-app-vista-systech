import { createContext } from "react";
import { type TodoContextType } from "../lib/todoContextUtils";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
