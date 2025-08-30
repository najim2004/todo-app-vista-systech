import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TodoApp from "./App.tsx";
import { TodoProvider } from "./contexts/TodoContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  </StrictMode>
);
