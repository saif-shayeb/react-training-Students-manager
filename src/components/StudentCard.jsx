import React from "react";
import { MdDeleteForever, MdModeEdit, MdEmail, MdCake } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

export default function StudentCard({ student, onEdit, onDelete, onDetails }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card student-card-item"
            onDoubleClick={() => onDetails(student)}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
                cursor: "pointer",
                transition: "var(--transition)"
            }}
        >
            <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                    className="avatar"
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "var(--primary-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary)",
                        fontSize: "1.25rem",
                        fontWeight: "bold"
                    }}
                >
                    {student.firstName[0]}{student.lastName[0]}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{student.firstName} {student.lastName}</h3>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>ID: #{student.id}</span>
                </div>
            </div>

            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <MdEmail /> {student.email}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <MdCake /> {String(student.birthDate || "").split("T")[0]}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "600", marginTop: "0.5rem" }}>
                    <FaGraduationCap style={{ color: "var(--secondary)" }} /> GPA: {student.gpa}
                </div>
            </div>

            <div className="card-actions" style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "auto",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border)"
            }}>
                <button
                    className="edit-btn"
                    onClick={(e) => { e.stopPropagation(); onEdit(student); }}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--primary)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        padding: "0.25rem"
                    }}
                >
                    <MdModeEdit title="Edit" />
                </button>
                <button
                    className="delete-btn"
                    onClick={(e) => { e.stopPropagation(); onDelete(student); }}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--danger)",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        padding: "0.25rem"
                    }}
                >
                    <MdDeleteForever title="Delete" />
                </button>
            </div>
        </motion.div>
    );
}
