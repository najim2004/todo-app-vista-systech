import type { TodoState, TodoAction } from "./todo-context"

export const initialState: TodoState = {
  todos: [],
  filter: "all",
  searchQuery: "",
  isLoading: false,
}

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  let newState: TodoState

  switch (action.type) {
    case "ADD_TODO":
      newState = {
        ...state,
        todos: [
          ...state.todos,
          {
            ...action.payload,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          },
        ],
      }
      break

    case "TOGGLE_TODO":
      newState = {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
      }
      break

    case "EDIT_TODO":
      newState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo,
        ),
      }
      break

    case "DELETE_TODO":
      newState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
      break

    case "CLEAR_COMPLETED":
      newState = {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      }
      break

    case "SET_FILTER":
      newState = {
        ...state,
        filter: action.payload,
      }
      break

    case "SET_SEARCH_QUERY":
      newState = {
        ...state,
        searchQuery: action.payload,
      }
      break

    case "SET_LOADING":
      newState = {
        ...state,
        isLoading: action.payload,
      }
      break

    case "LOAD_TODOS":
      newState = {
        ...state,
        todos: action.payload,
      }
      break

    default:
      return state
  }

  if (
    typeof window !== "undefined" &&
    action.type !== "LOAD_TODOS" &&
    action.type !== "SET_SEARCH_QUERY" &&
    action.type !== "SET_LOADING"
  ) {
    try {
      const todosToSave = newState.todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        dueDate: todo.dueDate?.toISOString(),
      }))
      localStorage.setItem("todos", JSON.stringify(todosToSave))
      localStorage.setItem("todoFilter", newState.filter)
    } catch (error) {
      console.warn("Failed to save to localStorage:", error)
    }
  }

  return newState
}
