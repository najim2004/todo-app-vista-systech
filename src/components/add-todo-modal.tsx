"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTodo } from "@/contexts/todo-context"

interface AddTodoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  const { actions } = useTodo()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [errors, setErrors] = useState<{ title?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { title?: string } = {}
    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    actions.addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    })

    setTitle("")
    setDescription("")
    setDueDate("")
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setDueDate("")
    setErrors({})
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose()
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      // Only submit if target is inside a form
      const form = (e.target as HTMLElement).closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-0 duration-200">
      <div
        className="bg-card rounded-2xl p-6 shadow-lg w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Add New Todo</h2>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({ ...errors, title: undefined })
              }}
              placeholder="Add a todo title"
              className={`bg-muted border-border rounded-lg ${errors.title ? "border-[#e51619]" : ""}`}
              autoFocus
            />
            {errors.title && <p className="text-[#e51619] text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
            <div className="relative">
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-muted border-border rounded-lg pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any description for your todo"
              className="bg-muted border-border rounded-lg min-h-[120px] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-border text-muted-foreground rounded-lg bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#15803d] hover:bg-[#15803d]/90 text-white rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Todo
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">Press Esc to cancel, Ctrl+Enter to add</p>
        </form>
      </div>
    </div>
  )
}
