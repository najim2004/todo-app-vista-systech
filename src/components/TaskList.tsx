import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import type { Todo } from "@/lib/todoContextUtils";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TaskList() {
  const { state, filteredTodos, clearCompleted } = useTodos();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Todo | null>(null);

  const handleEditTask = (task: Todo) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleClearCompleted = () => {
    clearCompleted();
  };

  return (
    <div className="space-y-6">
      {/* Section: Tasks Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium text-black">Tasks</h1>
        <div className="flex items-center gap-3">
          {state.todos.some((todo) => todo.completed) && (
            <Button
              variant="ghost"
              onClick={handleClearCompleted}
              className="text-red-600 hover:bg-red-50"
            >
              Clear Completed
            </Button>
          )}
          <Button
            size="lg"
            className="flex items-center gap-2 bg-[#15803D] hover:bg-[#15803D]/80 text-white !px-[28px] h-[60px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18} />
            Add Task
          </Button>
        </div>
      </div>

      {/* Section: Task List */}
      {filteredTodos.length > 0 ? (
        <div className="space-y-3">
          {filteredTodos.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
          ))}
        </div>
      ) : (
        /* Section: Empty State */
        <Card className="text-center py-12 border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="text-gray-400" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first task
          </p>
          <Button
            className="flex items-center gap-2 bg-[#15803D] hover:bg-[#15803D]/80 text-white mx-auto  !px-[28px] h-[60px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            Add your first task
          </Button>
        </Card>
      )}

      {/* Section: Modals */}
      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        task={null}
        isEdit={false}
      />
      <TaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={editingTask}
        isEdit={true}
      />
    </div>
  );
}
