import { createContext, useReducer, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

export const StudentsListContext = createContext(null);
export const StudentsListDispatchContext = createContext(null);

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
  const { isAuthenticated } = useAuth();
  const [studentsList, dispatch] = useReducer(studentsReducer, []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await api.get("/students/");
        const mapped = res.data.map(s => ({
          ...s,
          id: s.id, // Explicitly ensure id is users.id
          firstName: s.first_name,
          lastName: s.last_name,
          birthDate: s.birth_date
        }));
        dispatch({ type: "SET_STUDENTS", payload: mapped });
      } catch (e) {
        setError(e);
        toast.error(
          <div>
            Failed to fetch students
            <br />({e.message})
          </div>,
          { toastId: "fetch-error" },
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated]);

  async function addStudent(studentUserData) {
    const exists = studentsList.some((s) => s.email === studentUserData.email);

    if (exists)
      return {
        status: "already exists",
        message: "already exists a student with the same email",
      };

    try {
      setLoading(true);

      const payload = {
        first_name: studentUserData.firstName,
        last_name: studentUserData.lastName,
        email: studentUserData.email,
        password: studentUserData.password,
        type: "student",
        gender: studentUserData.gender,
        birth_date: studentUserData.birthDate,
        gpa: studentUserData.gpa
      };

      const res = await api.post("/students/", payload);

      const newStudent = {
        ...studentUserData,
        id: res.data.user_id // res.data is from success_response structure
      };

      dispatch({ type: "ADD_STUDENT", payload: newStudent });
      return { status: "success", message: "Student added successfully" };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.response?.data?.error || e.message };
    } finally {
      setLoading(false);
    }
  }

  async function deleteStudent(id) {
    try {
      setLoading(true);
      await api.delete(`/students/${id}`);
      dispatch({ type: "DELETE_STUDENT", payload: id });
      return { status: "success", message: "deleted" };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.response?.data?.error || e.message };
    } finally {
      setLoading(false);
    }
  }

  async function updateStudent(updatedStudent) {
    const newList = studentsList.filter((s) => s.id !== updatedStudent.id);
    const duplicate = newList.some((s) => s.email === updatedStudent.email);
    if (duplicate) {
      return { status: "already exists", message: "already exists" };
    }
    try {
      setLoading(true);

      const payload = {
        first_name: updatedStudent.firstName,
        last_name: updatedStudent.lastName,
        email: updatedStudent.email,
        password: updatedStudent.password,
        gender: updatedStudent.gender,
        birth_date: updatedStudent.birthDate,
        gpa: updatedStudent.gpa
      };

      await api.put(`/students/${updatedStudent.id}`, payload);

      dispatch({ type: "UPDATE_STUDENT", payload: updatedStudent });
      return { status: "success", message: "Student updated successfully" };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.response?.data?.error || e.message };
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
