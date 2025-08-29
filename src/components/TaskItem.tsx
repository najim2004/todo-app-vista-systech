import { Calendar, Edit, Trash2, Check } from 'lucide-react';
import { formatTaskDate } from '@/lib/date-utils';
import type { Todo } from '@/lib/todoContextUtils';
import { useTodos } from '@/hooks/useTodos';

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
    if (!task.completed) {
      onEdit(task);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(task.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm task-card" >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button 
          onClick={handleToggle}
          className={`w-5 h-5 border-2 rounded flex items-center justify-center mt-0.5 transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.completed && <Check size={12} />}
        </button>
        
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-semibold mb-2 ${
            task.completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm leading-relaxed ${
              task.completed 
                ? 'text-gray-400' 
                : 'text-gray-500'
            }`}>
              {task.description}
            </p>
          )}
        </div>
        
        {/* Task Meta & Actions */}
        <div className="flex items-center gap-3 text-gray-400 mt-0.5">
          {task.dueDate && (
            <div className="flex items-center gap-2" >
              <Calendar size={16} />
              <span className="text-sm">{formatTaskDate(task.dueDate)}</span>
            </div>
          )}
          
          {/* Edit button - only show for incomplete tasks */}
          {!task.completed && (
            <button 
              onClick={handleEdit}
              className="hover:text-gray-600 transition-colors p-1"
            >
              <Edit size={16} />
            </button>
          )}
          
          <button 
            onClick={handleDelete}
            className={`transition-colors p-1 ${
              task.completed 
                ? 'text-red-500 hover:text-red-600'
                : 'hover:text-red-500'
            }`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
