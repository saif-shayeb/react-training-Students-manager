import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./StudentsTable.css";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Details from "./details";
import React from "react";
import deleteStudent from "./Student";
import StudentAddForm from "./StudentAddForm";

const MotionTr = motion(Tr);

export default function StudentsTable({ studentsList, setStudentsList }) {
  const [searchquery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleDelete = (id) => {
    const deleted = deleteStudent({ id, studentsList, setStudentsList });
    if (deleted) {
      toast.info("Student record removed.", {
        icon: <MdDeleteForever />,
      });
    } else {
      toast.error("Failed to remove Student.", {
        icon: <MdDeleteForever />,
      });
    }
  };
  function handleStudentDetails(student) {
    setSelectedStudent(student);
    setShowDetails(true);
  }
  function handleEdit(student) {
    setSelectedStudent(student);
    setShowEdit(true);
  }

  const result = studentsList.filter((stu) =>
    (stu.firstName + " " + stu.lastName)
      .toLowerCase()
      .includes(searchquery.trim().toLowerCase()),
  );
  const rows = result.map((student) => (
    <MotionTr
      key={student.id}
      data-testid={student.id}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="table-row"
      onDoubleClick={(e) => handleStudentDetails(student)}
    >
      <Td>{student.firstName + " " + student.lastName}</Td>
      <Td>{student.birthDate}</Td>
      <Td>{student.email}</Td>
      <Td>{student.gpa}</Td>
      <Td className="operations-td">
        <button
          className="delete-btn"
          onClick={() => handleDelete(student.id)}
          data-testid={student.id + "delete"}
        >
          <MdDeleteForever title="Delete Student" />
        </button>
        <button className="edit-btn" onClick={() => handleEdit(student)}>
          <MdModeEdit title="Edit" />
        </button>
      </Td>
    </MotionTr>
  ));
  return (
    <>
      {!showDetails && !showEdit && (
        <div>
          <div className="table-container card">
            <div className="table-header-content">
              <h2 className="table-title">Student Records</h2>
              <p className="table-subtitle">
                A list of all students currently enrolled.
              </p>
              <p className="details-helper">
                *double Click student row to see the Details
              </p>
            </div>
            <div className="search-container">
              <div className="search-wrapper">
                <IoMdSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchquery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  data-testid={"search-test"}
                />
              </div>
            </div>
            <Table className="modern-table">
              <Thead>
                <Tr className="table-head-row">
                  <Th>Student Name</Th>
                  <Th>Birth Date</Th>
                  <Th>Email Address</Th>
                  <Th>GPA</Th>
                  <Th className="actions-header">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <AnimatePresence mode="popLayout">{rows}</AnimatePresence>
              </Tbody>
            </Table>
            {studentsList.length === 0 && (
              <div className="empty-state">
                <p>No student records found. Add one to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}
      {showDetails && (
        <Details student={selectedStudent} setDetails={setShowDetails} />
      )}
      {showEdit && (
        <StudentAddForm
          studentEdit={selectedStudent}
          setStudentsList={setStudentsList}
          studentsList={studentsList}
          isEdit={true}
          setShow={setShowEdit}
        />
      )}
    </>
  );
}
