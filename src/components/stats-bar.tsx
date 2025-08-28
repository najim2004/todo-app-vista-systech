"use client"

import { useTodo } from "@/contexts/todo-context"
import { CheckCircle, Circle, Clock, TrendingUp } from "lucide-react"

export function StatsBar() {
  const { selectors } = useTodo()

  const completionRate =
    selectors.totalTodos > 0 ? Math.round((selectors.completedTodos / selectors.totalTodos) * 100) : 0

  const stats = [
    {
      label: "All",
      value: selectors.totalTodos,
      icon: Circle,
      color: "text-[#94a3b8]",
      bgColor: "bg-[#f8fafc]",
    },
    {
      label: "Active",
      value: selectors.activeTodos,
      icon: Clock,
      color: "text-[#f59e0b]",
      bgColor: "bg-[#fef3c7]",
    },
    {
      label: "Completed",
      value: selectors.completedTodos,
      icon: CheckCircle,
      color: "text-[#15803d]",
      bgColor: "bg-[#dcfce7]",
    },
    {
      label: "Progress",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-[#3b82f6]",
      bgColor: "bg-[#dbeafe]",
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#94a3b8]">{stat.label}</p>
                <p className="text-lg font-bold text-[#000000]">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      {selectors.totalTodos > 0 && (
        <div className="mt-4 pt-4 border-t border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#000000]">Overall Progress</span>
            <span className="text-sm text-[#94a3b8]">{completionRate}% Complete</span>
          </div>
          <div className="w-full bg-[#e2e8f0] rounded-full h-2">
            <div
              className="bg-[#15803d] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
