"use client";

import { useState } from "react";
import { Plus, Search, Calendar, Edit, Pause, X } from "lucide-react";
import { TaskDetailsModal } from "./components/task-details-modal";
import { AddTodoModal } from "./components/add-todo-modal";
import { Button } from "./components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "./components/ui/input";
import { useTodo } from "./contexts/todo-context";

export default function TodoApp() {
  const { selectors, actions } = useTodo();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | (typeof selectors.filteredTodos)[number]>(null);

  const handleEditTask = (task: typeof selectors.filteredTodos[number]) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsTaskDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-[#000000] font-medium">All : {selectors.totalTodos}</div>
            <div className="text-[#000000] font-medium">Active : {selectors.activeTodos}</div>
            <div className="text-[#000000] font-medium">Completed : {selectors.completedTodos}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-6">
            {/* Colorful triangular logo */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L28 24H4L16 4Z" fill="#3B82F6" />
                <path d="M16 4L22 16H10L16 4Z" fill="#EF4444" />
                <path d="M16 10L19 16H13L16 10Z" fill="#10B981" />
              </svg>
            </div>

            {/* Search bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={selectors.searchQuery}
                onChange={e => actions.setSearchQuery(e.target.value)}
                className="pl-10 pr-10 border-[#e2e8f0] rounded-lg bg-[#f8fafc] focus:bg-white"
              />
              {selectors.searchQuery && (
                <button
                  onClick={() => actions.setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] hover:text-[#000000]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter dropdown */}
            <div className="flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] rounded-lg bg-[#f8fafc]">
              <span className="text-[#000000] font-medium">All</span>
              <div className="w-2 h-2 rounded-full bg-[#94a3b8]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#000000]">Tasks</h2>
          <Button
            onClick={handleAddTask}
            className="bg-[#15803d] hover:bg-[#15803d]/90 text-white rounded-lg px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-4">
          {selectors.filteredTodos.length === 0 && (
            <div className="text-center text-[#999]">No tasks found.</div>
          )}
          {selectors.filteredTodos.map((todo, index) => (
            <div key={todo.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="mt-1">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => actions.toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded border-2 ${
                      todo.completed
                        ? "bg-[#15803d] border-[#15803d] text-white"
                        : "border-[#e2e8f0]"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-[#000000] font-semibold text-lg mb-2">
                    {todo.title}
                  </h3>
                  <p className="text-[#7f7f7f] text-sm leading-relaxed">
                    {todo.description}
                  </p>
                </div>

                {/* Date and actions */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[#7f7f7f]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditTask(todo)}
                      className="p-2 hover:bg-[#f8fafc] rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-[#7f7f7f]" />
                    </button>
                    {/* You can add more actions here */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TaskDetailsModal
          isOpen={isTaskDetailsOpen}
          onClose={() => setIsTaskDetailsOpen(false)}
          task={selectedTask}
        />

        {/* Add Todo Modal */}
        <AddTodoModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
}
