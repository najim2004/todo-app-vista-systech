import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTodos } from "@/hooks/useTodos";
import { type Todo } from "@/lib/todoContextUtils";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Todo | null;
  isEdit: boolean;
}

export default function TaskModal({
  isOpen,
  onClose,
  task,
  isEdit,
}: TaskModalProps) {
  const { addTodo, updateTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      if (isEdit && task) {
        await updateTodo(task.id, {
          title: title.trim(),
          description: description.trim() || null,
          dueDate: dueDate || null,
        });
      } else {
        await addTodo({
          title: title.trim(),
          description: description.trim() || null,
          dueDate: dueDate || null,
        });
      }
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    } catch (error) {
      console.error("Failed to add/update todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  const titleId = isEdit ? "editTaskTitle" : "taskTitle";
  const descriptionId = isEdit ? "editTaskDescription" : "taskDescription";
  const dateId = isEdit ? "editTaskDate" : "taskDate";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md fade-in bg-card border-border"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle className="text-card-foreground">
            {isEdit ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={titleId} className="text-card-foreground">
              Task Title *
            </Label>
            <Input
              id={titleId}
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
              className="bg-input border-border text-foreground focus:ring-accent focus:border-accent placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={descriptionId} className="text-card-foreground">
              Description
            </Label>
            <Textarea
              id={descriptionId}
              placeholder="Enter task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={3}
              className="resize-none bg-input border-border text-foreground focus:ring-accent focus:border-accent placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={dateId} className="text-card-foreground">
              Due Date
            </Label>
            <Input
              id={dateId}
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isSubmitting}
              className="bg-input border-border text-foreground focus:ring-accent focus:border-accent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 border-border text-foreground hover:bg-muted hover:text-foreground"
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !dueDate}
              className="flex-1 btn-hover bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSubmitting
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                ? "Save Changes"
                : "Add Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
