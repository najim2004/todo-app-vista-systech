import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import type { Todo } from "@/lib/todoContextUtils";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="space-y-4 sm:space-y-6">
      {/* Section: Tasks Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-medium text-foreground">
          Tasks
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {state.todos.some((todo) => todo.completed) && (
            <Button
              variant="ghost"
              onClick={handleClearCompleted}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive h-10 sm:h-auto"
            >
              Clear Completed
            </Button>
          )}
          <Button
            size="lg"
            className="flex items-center justify-center gap-2 sm:gap-7 bg-accent hover:bg-accent/90 text-accent-foreground px-6 sm:px-[28px] h-12 sm:h-[60px] w-full sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="size-4 sm:size-[18px]" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Section: Task List */}
      {filteredTodos.length > 0 ? (
        <AnimatePresence>
          <motion.div
            layout
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredTodos.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Section: Empty State */
        <Card className="text-center py-8 sm:py-12 border-border bg-card mx-2 sm:mx-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="text-muted-foreground" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2">
            No tasks found
          </h3>
          <p className="text-muted-foreground mb-6 px-4 sm:px-0">
            Get started by adding your first task
          </p>
          <Button
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground mx-auto px-6 sm:px-[28px] h-12 sm:h-[60px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="size-4 sm:size-[18px]" />
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
