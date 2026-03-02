import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../styles/StudentsTable.css";
import { MdDeleteForever, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import Details from "./details";
import React from "react";
import StudentAddForm from "./StudentAddForm";
import {
  StudentsListContext,
  StudentsListDispatchContext,
} from "../contexts/StudentContext";

const MotionTr = motion(Tr);

export default function StudentsTable() {
  const [searchquery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { studentsList, error, loading } = useContext(StudentsListContext);
  const { deleteStudent } = useContext(StudentsListDispatchContext);
  const [page, setPage] = useState(1);
  const handleDelete = (id) => {
    const res = deleteStudent(id);
    if (res.status === "success") {
      toast.info("Student record removed.", {
        icon: <MdDeleteForever />,
      });
    } else if (res.status === "error") {
      toast.error("Failed to remove Student. error: " + res.message, {
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
  const filteredStudents = useMemo(
    () =>
      studentsList.filter((stu) =>
        (stu.firstName + " " + stu.lastName)
          .toLowerCase()
          .includes(searchquery.trim().toLowerCase()),
      ),
    [studentsList, searchquery],
  );

  const totalPages = Math.ceil(filteredStudents.length / 10);

  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * 10;
    return filteredStudents.slice(start, start + 10);
  }, [filteredStudents, page]);

  // Reset to first page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchquery]);
  const rows = paginatedStudents.map((student) => (
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
              {!loading && !error && (
                <Tbody>
                  <AnimatePresence mode="popLayout">{rows}</AnimatePresence>
                </Tbody>
              )}
            </Table>
            {studentsList.length === 0 && !loading && !error && (
              <div className="empty-state">
                <p>No student records found. Add one to get started!</p>
              </div>
            )}
            {loading && (
              <div className="empty-state">
                <div className="loading-content">
                  <AiOutlineLoading3Quarters className="spinner" />
                  <p>Loading student records...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="empty-state" style={{ color: "red" }}>
                <p>Error:({error.message})</p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <MdChevronLeft /> Previous
                </button>
                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      className={`pagination-number ${page === i + 1 ? "active" : ""}`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next <MdChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showDetails && (
        <Details student={selectedStudent} setShowing={setShowDetails} />
      )}
      {showEdit && (
        <StudentAddForm
          studentEdit={selectedStudent}
          isEdit={true}
          setShow={setShowEdit}
        />
      )}
    </>
  );
}
