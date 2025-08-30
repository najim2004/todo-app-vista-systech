import { Calendar, Trash2, Check, SquarePen } from "lucide-react";
import { formatTaskDate } from "@/lib/date-utils";
import type { Todo } from "@/lib/todoContextUtils";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Todo;
  onEdit: (task: Todo) => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const { toggleTodo, deleteTodo } = useTodos();

  const handleToggle = () => {
    toggleTodo(task.id);
  };

  const handleEdit = () => {
    if (!task.completed) onEdit(task);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTodo(task.id);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 lg:p-5 shadow-sm task-card">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-start gap-3 mb-3">
          {/* Checkbox */}
          <div
            onClick={handleToggle}
            className={`size-6 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 cursor-pointer transition-colors ${
              task.completed
                ? "bg-accent border-accent text-accent-foreground"
                : "border-border hover:border-accent hover:bg-accent/10 bg-card"
            }`}
          >
            <motion.div
              layout
              transition={{ duration: 0.2 }}
            >
              {task.completed && <Check size={10} />}
            </motion.div>
          </div>

          {/* Task Content */}
          <div className="min-w-0 flex-1">
            <h3
              className={`text-base font-semibold mb-1 transition-colors ${
                task.completed
                  ? "text-muted-foreground line-through"
                  : "text-card-foreground"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs leading-relaxed mb-2 transition-colors ${
                  task.completed
                    ? "text-muted-foreground line-through"
                    : "text-muted-foreground"
                }`}
              >
                {task.description}
              </p>
            )}

            {/* Date for mobile */}
            {task.dueDate && (
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar size={14} />
                <span className="text-sm">{formatTaskDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions for mobile */}
        <div className="flex justify-end gap-2">
          {!task.completed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-muted-foreground hover:text-card-foreground transition-colors h-8 w-8 p-0 hover:bg-accent/10"
            >
              <SquarePen size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className={`transition-colors h-8 w-8 p-0 hover:bg-destructive/10 ${
              task.completed
                ? "text-destructive hover:text-destructive/80"
                : "text-muted-foreground hover:text-destructive"
            }`}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center gap-4 lg:gap-[160px]">
        <div className="flex flex-grow items-start gap-4">
          {/* Checkbox */}
          <div
            onClick={handleToggle}
            className={`size-8 rounded border-2 flex items-center justify-center mt-0.5 cursor-pointer transition-colors ${
              task.completed
                ? "bg-accent border-accent text-accent-foreground"
                : "border-border hover:border-accent hover:bg-accent/10 bg-card"
            }`}
          >
            <motion.div
              layout
              transition={{ duration: 0.2 }}
            >
              {task.completed && <Check size={12} />}
            </motion.div>
          </div>

          {/* Task Content */}
          <div className="min-w-0">
            <h3
              className={`text-lg font-semibold mb-2 transition-colors ${
                task.completed
                  ? "text-muted-foreground line-through"
                  : "text-card-foreground"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs leading-relaxed transition-colors ${
                  task.completed
                    ? "text-muted-foreground line-through"
                    : "text-muted-foreground"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Task Meta & Actions */}
        <div className="text-nowrap flex items-center gap-3 lg:gap-[115px] mt-0.5">
          {task.dueDate && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={20} />
              <span className="text-lg">{formatTaskDate(task.dueDate)}</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Edit button - only for incomplete tasks */}
            {!task.completed && (
              <Button
                variant="ghost"
                size="lg"
                onClick={handleEdit}
                className="text-muted-foreground hover:text-card-foreground transition-colors !w-[30px] !h-[30px] hover:!bg-transparent"
              >
                <SquarePen size={30} className="size-[30px]" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="lg"
              onClick={handleDelete}
              className={`transition-colors !w-[30px] !h-[30px] hover:!bg-transparent ${
                task.completed
                  ? "text-destructive hover:text-destructive/80"
                  : "text-muted-foreground hover:text-destructive"
              }`}
            >
              <Trash2 size={30} className="size-[30px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
