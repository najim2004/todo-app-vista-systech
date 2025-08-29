import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import type { Todo } from "@/lib/todoContextUtils";
import { useTodos } from "@/hooks/useTodos";

export default function TaskList() {
  const { filteredTodos } = useTodos();
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

  return (
    <div>
      {/* Section: Tasks Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
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
        <div
          className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="text-gray-400" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding your first task
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Plus size={16} className="mr-2" />
            Add your first task
          </button>
        </div>
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
