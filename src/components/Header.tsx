import { useTodos } from "@/hooks/useTodos";

export default function Header() {
  const { stats } = useTodos();

  return (
    /* Section: Header */
    <div className="bg-white rounded-[10px] shadow-md px-6 py-2 lg:px-[60px] lg:py-[18px]">
      <div className="grid grid-cols-3 gap-4">
        {/* All Tasks */}
        <div className="text-center">
          <span className="text-gray-700 text-base font-medium">
            All : {stats.total}
          </span>
        </div>

        {/* Active Tasks */}
        <div className="text-center">
          <span className="text-gray-700 text-base font-medium">
            Active : {stats.active}
          </span>
        </div>

        {/* Completed Tasks */}
        <div className="text-center">
          <span className="text-gray-700 text-base font-medium">
            Completed : {stats.completed}
          </span>
        </div>
      </div>
    </div>
  );
}
