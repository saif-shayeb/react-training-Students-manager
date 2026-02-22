import React, { useContext } from "react";

export default function deleteStudent(id, list, dispatch) {
  const res = list.some((s) => s.id == id);
  if (res) {
    dispatch({ type: "delete", student: { id: id } });
    return true;
  }
  return false;
}

export function addStudent(student, dispatch, list) {
  const res = list.some((s) => s.email === student.email);
  if (res) {
    return false;
  }
  dispatch({ type: "add", student: student });
  return true;
}
export function updateStudent(student, dispatch, studensList) {
  const filtered = studensList.filter((s) => s.id != student.id);
  const exists = filtered.some((s) => s.email === student.email);
  if (exists) return false;
  dispatch({ type: "update", student: student });
  return true;
}
