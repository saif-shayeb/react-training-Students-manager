import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { toast } from "react-toastify";
export default function deleteStudent({ id, studentsList, setStudentsList }) {
  const exists = studentsList.find((s) => s.id == id);
  if (!exists) return false;
  const newList = studentsList.filter((s) => s.id != id);
  setStudentsList(newList);
  return true;
}

export function addStudent(student, studentsList, setStudentsList) {
  const res = studentsList.filter((s) => s.email == student.email);
  if (res.length > 0) {
    return false;
  } else {
    setStudentsList([...studentsList, student]);
    return true;
  }
}
export function updateStudent(student, setStudensList, studensList) {
  const filtered = studensList.filter((s) => s.id != student.id);
  const exists = filtered.some((s) => s.email === student.email);
  if (exists) return false;
  setStudensList([...filtered, student]);
  return true;
}
