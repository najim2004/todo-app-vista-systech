"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Edit3, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTodo, type Todo } from "@/contexts/todo-context"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { actions } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || "")

  const handleToggle = () => {
    actions.toggleTodo(todo.id)
  }

  const handleEdit = () => {
    if (todo.completed) return
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      actions.editTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || "")
    setIsEditing(false)
  }

  const handleDelete = () => {
    actions.deleteTodo(todo.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancelEdit()
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSaveEdit()
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  if (isEditing) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-sm animate-in slide-in-from-left-1 duration-200">
        <div className="space-y-4" onKeyDown={handleKeyDown}>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="font-semibold text-foreground bg-muted border-border rounded-lg"
            placeholder="Todo title"
            autoFocus
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="text-muted-foreground text-sm bg-muted border-border rounded-lg min-h-[80px] resize-none"
            placeholder="Add description..."
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelEdit}
              className="border-border text-muted-foreground bg-transparent"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
              className="bg-[#15803d] hover:bg-[#15803d]/90 text-white"
              disabled={!editTitle.trim()}
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Press Esc to cancel, Ctrl+Enter to save</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm animate-in fade-in-0 slide-in-from-bottom-1 duration-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        {!todo.completed && (
          <button
            onClick={handleToggle}
            className="w-5 h-5 border-2 border-border rounded mt-1 hover:border-[#15803d] transition-all duration-200 hover:scale-110"
            aria-label="Mark as complete"
          />
        )}

        {todo.completed && (
          <div className="w-5 h-5 bg-[#15803d] rounded flex items-center justify-center mt-1 animate-in zoom-in-75 duration-200">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}

        <div className="flex-1">
          <h3
            className={`font-semibold mb-2 transition-all duration-200 ${todo.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
          >
            {todo.title}
          </h3>
          {todo.description && <p className="text-muted-foreground text-sm leading-relaxed">{todo.description}</p>}
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          {todo.dueDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(todo.dueDate)}</span>
            </div>
          )}

          {!todo.completed && (
            <button
              onClick={handleEdit}
              className="hover:text-[#15803d] transition-colors duration-200 hover:scale-110"
              aria-label="Edit todo"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleDelete}
            className="hover:text-[#e51619] transition-colors duration-200 hover:scale-110"
            aria-label="Delete todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
