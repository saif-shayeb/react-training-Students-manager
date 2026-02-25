import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StudentsListContext = createContext(null);
export const StudentsListDispatchContext = createContext(null);

const API_URL = "http://localhost:3000/student";

function studentsReducer(state, action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return action.payload;

    case "ADD_STUDENT":
      return [...state, action.payload];

    case "DELETE_STUDENT":
      return state.filter((s) => s.id !== action.payload);

    case "UPDATE_STUDENT":
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s,
      );

    default:
      return state;
  }
}

export function StudentsProvider({ children }) {
  const [studentsList, dispatch] = useReducer(studentsReducer, []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        dispatch({ type: "SET_STUDENTS", payload: res.data });
      } catch (e) {
        setError(e);
        toast.error(
          <>
            Failed to fetch students
            <br />
            ({e.message})
          </>,
          { toastId: "fetch-error" }
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function addStudent(student) {
    const exists = studentsList.some((s) => s.email === student.email);

    if (exists) return { status: "already exists", message: "already exists a student with the same email" };

    try {
      setLoading(true);
      const res = await axios.post(API_URL, student);
      dispatch({ type: "ADD_STUDENT", payload: res.data });
      return { status: "success", message: res.statusText };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.message };
    } finally {
      setLoading(false);
    }
  }

  async function deleteStudent(id) {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: "DELETE_STUDENT", payload: id });
      return { status: "success", message: res.statusText };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.message };
    } finally {
      setLoading(false);
    }
  }

  async function updateStudent(updatedStudent) {
    const newList = studentsList.filter((s) => s.id != updatedStudent.id);
    const duplicate = newList.some((s) => s.email === updatedStudent.email);
    if (duplicate) {
      return { status: "already exists", message: "already exists" };
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${API_URL}/${updatedStudent.id}`,
        updatedStudent,
      );
      dispatch({ type: "UPDATE_STUDENT", payload: res.data });
      return { status: "success", message: res.statusText };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.message };
    } finally {
      setLoading(false);
    }
  }

  return (
    <StudentsListDispatchContext.Provider
      value={{
        addStudent,
        deleteStudent,
        updateStudent,
        dispatch,
      }}
    >
      <StudentsListContext.Provider value={{ studentsList, loading, error }}>
        {children}
      </StudentsListContext.Provider>
    </StudentsListDispatchContext.Provider>
  );
}
