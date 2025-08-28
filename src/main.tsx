import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoApp from "./App.tsx";
import { TodoProvider } from "./contexts/todo-context";
import { ThemeProvider } from "./contexts/theme-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>
);
