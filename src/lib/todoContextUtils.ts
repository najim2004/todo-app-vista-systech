export interface Todo {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsertTodo {
  title: string;
  description?: string | null;
  dueDate: string | null;
}

export type FilterType = "all" | "active" | "completed";

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
  searchQuery: string;
  isLoading: boolean;
}

export type TodoAction =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

export interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  filteredTodos: Todo[];
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  addTodo: (todo: InsertTodo) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
}

export const initialState: TodoState = {
  todos: [],
  filter: "all",
  searchQuery: "",
  isLoading: false,
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
