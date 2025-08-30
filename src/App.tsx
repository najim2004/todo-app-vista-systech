import { TodoProvider } from "@/contexts/TodoContext";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <TodoProvider>
      <ThemeToggle />
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 py-8 lg:py-20 space-y-6">
          <Header />
          <SearchBar />
          <TaskList />
        </div>
      </div>
    </TodoProvider>
  );
}
