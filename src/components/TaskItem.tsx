import { Calendar, Edit, Trash2, Check, SquarePen } from "lucide-react";
import { formatTaskDate } from "@/lib/date-utils";
import type { Todo } from "@/lib/todoContextUtils";
import { useTodos } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Todo;
  onEdit: (task: Todo) => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const { toggleTodo, deleteTodo } = useTodos();

  const handleToggle = () => toggleTodo(task.id);

  const handleEdit = () => {
    if (!task.completed) onEdit(task);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTodo(task.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm task-card">
      <div className="flex items-center gap-4 lg:gap-[160px]">
        <div className="flex flex-grow items-start gap-4">
          {/* Checkbox */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            className={`size-8 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
              task.completed
                ? "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:text-white"
                : "border-gray-300 hover:border-green-500"
            }`}
          >
            {task.completed && <Check size={12} />}
          </Button>

          {/* Task Content */}
          <div className="min-w-0">
            <h3
              className={`text-lg font-semibold mb-2 ${
                task.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs leading-relaxed ${
                  task.completed ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Task Meta & Actions */}
        <div className="text-nowrap flex items-center gap-3 lg:gap-[115px] text-gray-400 mt-0.5">
          {task.dueDate && (
            <div className="flex items-center gap-2">
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
                className="hover:text-gray-600 transition-colors !w-[30px] !h-[30px]"
              >
                <SquarePen size={30} className="size-[30px]" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="lg"
              onClick={handleDelete}
              className={`transition-colors  !w-[30px] !h-[30px] ${
                task.completed
                  ? "text-red-500 hover:text-red-600"
                  : "hover:text-red-500"
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
