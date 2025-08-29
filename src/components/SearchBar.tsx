import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useTodos } from '@/hooks/useTodos';
import type { FilterType } from '@/lib/todoContextUtils';

export default function SearchBar() {
  const { state, setFilter, setSearchQuery, clearCompleted } = useTodos();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterSelect = (filter: FilterType) => {
    setFilter(filter);
    setIsFilterOpen(false);
  };

  const handleClearCompleted = () => {
    clearCompleted();
    setIsFilterOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo size={40} />
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={state.searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700"
              
            />
            {state.searchQuery && (
              <button 
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
        
        {/* Filter Button */}
        <div className="relative flex-shrink-0" ref={filterRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors min-w-[80px] justify-center"
            
          >
            <span className="capitalize font-medium">{state.filter}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-40 z-50 fade-in">
              <button 
                onClick={() => handleFilterSelect('all')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                
              >
                All
              </button>
              <button 
                onClick={() => handleFilterSelect('active')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                
              >
                Active
              </button>
              <button 
                onClick={() => handleFilterSelect('completed')}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
               
              >
                Completed
              </button>
              {state.todos.some(todo => todo.completed) && (
                <>
                  <hr className="my-2 border-gray-200" />
                  <button 
                    onClick={handleClearCompleted}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600 text-sm"
                    
                  >
                    Clear Completed
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
