import { FaPlus, FaTable, FaUserGraduate } from "react-icons/fa";
import React, { useContext } from "react";
import { StudentsListContext } from "../contexts/StudentContext";
export default function Dashboard({}) {
  const studentsList = useContext(StudentsListContext);
  const stats = [
    {
      label: "Total Students",
      value: studentsList.length,
      icon: <FaUserGraduate />,
      color: "var(--primary)",
    },
    {
      label: "Average GPA",
      value: studentsList.length
        ? (
            studentsList.reduce((acc, s) => acc + parseFloat(s.gpa), 0) /
            studentsList.length
          ).toFixed(2)
        : "0.00",
      icon: <FaTable />,
      color: "var(--secondary)",
    },
    {
      label: "New Registrations",
      value: studentsList.length,
      icon: <FaPlus />,
      color: "var(--accent)",
    },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="card stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: stat.color + "20", color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="card welcome-card">
          <h3>Welcome back!</h3>
        </div>
      </div>
    </div>
  );
}
