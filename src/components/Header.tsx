import { useTodos } from "@/hooks/useTodos";

export default function Header() {
  const { stats } = useTodos();

  return (
    /* Section: Header */
    <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border px-4 sm:px-6 py-3 sm:py-2 lg:px-14 lg:py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        {/* Mobile Layout - Single Column */}
        <div className="sm:hidden space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground">
              All:
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {stats.total}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground">
              Active:
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {stats.active}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground">
              Completed:
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {stats.completed}
            </span>
          </div>
        </div>

        {/* Desktop Layout - Three Columns */}
        <div className="hidden sm:block text-center">
          <span className="text-base font-medium text-card-foreground">
            All : {stats.total}
          </span>
        </div>

        <div className="hidden sm:block text-center">
          <span className="text-base font-medium text-card-foreground">
            Active : {stats.active}
          </span>
        </div>

        <div className="hidden sm:block text-center">
          <span className="text-base font-medium text-card-foreground">
            Completed : {stats.completed}
          </span>
        </div>
      </div>
    </div>
  );
}
