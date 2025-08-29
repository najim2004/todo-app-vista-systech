import { TodoProvider } from "@/contexts/TodoContext";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <TodoProvider>
      <div className="min-h-screen app-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 py-8 lg:py-20 space-y-6">
          <Header />
          <SearchBar />
          <TaskList />
        </div>
      </div>
    </TodoProvider>
  );
}
