import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

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
  const [studentsList, dispatch] = useReducer(studentsReducer, []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(API_URL + "/student");
        const res2 = await axios.get(API_URL + "/user?type=student");
        // merge the two resources into a single object per student
        const studentsWithUserData = res.data.map((student) => {
          const userData = res2.data.find(
            (user) => user.id === student.id,
          );
          return { ...student, ...userData };
        });
        dispatch({ type: "SET_STUDENTS", payload: studentsWithUserData });
      } catch (e) {
        setError(e);
        toast.error(
          <>
            Failed to fetch students
            <br />({e.message})
          </>,
          { toastId: "fetch-error" },
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function addStudent(studentUserData) {
    const exists = studentsList.some((s) => s.email === studentUserData.email);

    if (exists)
      return {
        status: "already exists",
        message: "already exists a student with the same email",
      };

    try {
      setLoading(true);

      // Check for unique email in user collection
      const checkUser = await axios.get(`${API_URL}/user?email=${studentUserData.email}`);
      if (checkUser.data.length > 0) {
        setLoading(false);
        return { status: "error", message: "Email already exists" };
      }

      const student = {
        id: studentUserData.id,
        gpa: studentUserData.gpa,
      };
      const user = {
        id: studentUserData.id,
        email: studentUserData.email,
        firstName: studentUserData.firstName,
        lastName: studentUserData.lastName,
        birthDate: studentUserData.birthDate,
        gender: studentUserData.gender,
        password: studentUserData.password,
        type: "student",
      };
      const res = await axios.post(API_URL + "/student", student);
      const res2 = await axios.post(API_URL + "/user", user);

      // merge results so callers have full object
      dispatch({ type: "ADD_STUDENT", payload: { ...res.data, ...res2.data } });
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
      // remove from both collections
      await axios.delete(`${API_URL}/student/${id}`);
      await axios.delete(`${API_URL}/user/${id}`);
      dispatch({ type: "DELETE_STUDENT", payload: id });
      return { status: "success", message: "deleted" };
    } catch (e) {
      setError(e);
      return { status: "error", message: e.message };
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

      // Check for unique email if it was changed
      const oldStudent = studentsList.find(s => s.id === updatedStudent.id);
      if (oldStudent && oldStudent.email !== updatedStudent.email) {
        const checkUser = await axios.get(`${API_URL}/user?email=${updatedStudent.email}`);
        if (checkUser.data.length > 0) {
          setLoading(false);
          return { status: "error", message: "Email already exists" };
        }
      }

      const studentPayload = {
        gpa: updatedStudent.gpa,
      };
      const userPayload = {
        email: updatedStudent.email,
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        birthDate: updatedStudent.birthDate,
        gender: updatedStudent.gender,
        password: updatedStudent.password,
        type: "student",
      };
      const resStud = await axios.put(
        `${API_URL}/student/${updatedStudent.id}`,
        studentPayload,
      );
      const resUser = await axios.put(
        `${API_URL}/user/${updatedStudent.id}`,
        userPayload,
      );
      const merged = { ...resStud.data, ...resUser.data };
      dispatch({ type: "UPDATE_STUDENT", payload: merged });
      return { status: "success", message: resStud.statusText };
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
