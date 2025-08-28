"use client"

import { useEffect, useState } from "react"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTodo } from "@/contexts/todo-context"

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  task?: {
    id: string
    title: string
    description: string
    dueDate?: Date
  } | null
}

export function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
  const { actions } = useTodo()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  useEffect(() => {
    setTitle(task?.title || "")
    setDescription(task?.description || "")
    setDueDate(task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "")
  }, [task, isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!title.trim()) return
    if (task) {
      actions.editTodo(task.id, {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate) : undefined,
      })
    }
    onClose()
  }

  const handleDelete = () => {
    if (task) {
      actions.deleteTodo(task.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#000000]">Task Details</h3>
            <button onClick={onClose} className="p-1 hover:bg-[#f8fafc] rounded">
              <X className="w-4 h-4 text-[#7f7f7f]" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Title field */}
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">Title</label>
              <Input
                placeholder="Add a task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[#e2e8f0] rounded-lg"
              />
            </div>

            {/* Date field */}
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">Date</label>
              <div className="relative">
                <Input
                  placeholder="Select date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border-[#e2e8f0] rounded-lg pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#94a3b8] w-4 h-4" />
              </div>
            </div>

            {/* Description field */}
            <div>
              <label className="block text-sm font-medium text-[#000000] mb-2">Description</label>
              <textarea
                placeholder="Add any description to you task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-[#e2e8f0] text-[#7f7f7f] rounded-lg bg-transparent"
              >
                Close
              </Button>
              {task && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDelete}
                  className="flex-1 border-[#e51619] text-[#e51619] bg-transparent hover:bg-[#faf7f7]"
                >
                  Delete
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#15803d] hover:bg-[#15803d]/90 text-white rounded-lg"
              >
                {task ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
