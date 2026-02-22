import { useEffect, useReducer } from "react";

export function useLocalStorage(key, defaultValue) {
  const initializer = () => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [...state, action.student];

      case "delete":
        return state.filter((s) => s.id !== action.student.id);

      case "update":
        return [
          ...state.filter((s) => s.id !== action.student.id),
          action.student,
        ];

      default:
        return state;
    }
  };

  const [value, dispatch] = useReducer(reducer, defaultValue, initializer);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, dispatch];
}
