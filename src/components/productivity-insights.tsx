"use client"

import { useTodo } from "@/contexts/todo-context"
import { Calendar, Target, Zap, Award } from "lucide-react"

export function ProductivityInsights() {
  const { selectors, state } = useTodo()

  // Calculate insights
  const todosCreatedToday = state.todos.filter((todo) => {
    const today = new Date()
    const todoDate = new Date(todo.createdAt)
    return todoDate.toDateString() === today.toDateString()
  }).length

  const todosCompletedToday = state.todos.filter((todo) => {
    const today = new Date()
    const todoDate = new Date(todo.createdAt)
    return todo.completed && todoDate.toDateString() === today.toDateString()
  }).length

  const overdueTodos = state.todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false
    return new Date(todo.dueDate) < new Date()
  }).length

  const upcomingTodos = state.todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return new Date(todo.dueDate) <= tomorrow
  }).length

  const insights = [
    {
      label: "Created Today",
      value: todosCreatedToday,
      icon: Calendar,
      color: "text-[#3b82f6]",
      bgColor: "bg-[#dbeafe]",
    },
    {
      label: "Completed Today",
      value: todosCompletedToday,
      icon: Award,
      color: "text-[#15803d]",
      bgColor: "bg-[#dcfce7]",
    },
    {
      label: "Due Soon",
      value: upcomingTodos,
      icon: Target,
      color: "text-[#f59e0b]",
      bgColor: "bg-[#fef3c7]",
    },
    {
      label: "Overdue",
      value: overdueTodos,
      icon: Zap,
      color: "text-[#e51619]",
      bgColor: "bg-[#fee2e2]",
    },
  ]

  // Only show if there are todos
  if (selectors.totalTodos === 0) return null

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Today's Insights</h3>
      <div className="grid grid-cols-2 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon
          return (
            <div key={insight.label} className="flex items-center gap-3 p-3 rounded-lg bg-[#f8fafc]">
              <div className={`w-8 h-8 ${insight.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${insight.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#94a3b8]">{insight.label}</p>
                <p className="text-lg font-bold text-[#000000]">{insight.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Motivational message */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#15803d]/10 to-[#3b82f6]/10 rounded-lg">
        <p className="text-sm text-[#000000] font-medium">
          {todosCompletedToday > 0
            ? `Great job! You've completed ${todosCompletedToday} todo${todosCompletedToday > 1 ? "s" : ""} today.`
            : overdueTodos > 0
              ? `You have ${overdueTodos} overdue todo${overdueTodos > 1 ? "s" : ""}. Let's catch up!`
              : upcomingTodos > 0
                ? `${upcomingTodos} todo${upcomingTodos > 1 ? "s are" : " is"} due soon. Stay on track!`
                : "Keep up the momentum! You're doing great."}
        </p>
      </div>
    </div>
  )
}
