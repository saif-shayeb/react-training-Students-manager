import React, { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { StudentsListContext } from "../contexts/StudentContext";
import { FaUserGraduate, FaTable } from "react-icons/fa";

export default function StudentDashboard() {
    const { user } = useAuth();
    const { studentsList, loading } = useContext(StudentsListContext);

    const studentData = studentsList.find(s => s.email === user?.email);

    if (loading) {
        return <div className="dashboard-container"><h2>Loading your information...</h2></div>;
    }

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">My Dashboard</h2>
            <div className="card details-card">
                <div className="details-header">
                    <FaUserGraduate className="details-main-icon" />
                    <h2 className="details-title">Welcome, {user?.name}</h2>
                </div>

                {studentData ? (
                    <div className="details-filled">
                        <div className="info-item">
                            <label>Full Name</label>
                            <h3>{studentData.firstName} {studentData.lastName}</h3>
                        </div>
                        <div className="info-item">
                            <label>Email Address</label>
                            <h3>{studentData.email}</h3>
                        </div>
                        <div className="info-item">
                            <label>Birth Date</label>
                            <h3>{studentData.birthDate?.split("T")[0]}</h3>
                        </div>
                        <div className="info-item">
                            <label>Current GPA</label>
                            <h3 className="gpa-value" style={{
                                color: parseFloat(studentData.gpa) >= 3 ? "var(--success)" : "var(--warning)"
                            }}>
                                {studentData.gpa}
                            </h3>
                        </div>
                    </div>
                ) : (
                    <div className="details-empty">
                        <FaTable className="placeholder-icon" />
                        <p>We couldn't find your student record. Please contact the administrator.</p>
                    </div>
                )}
            </div>

            <div className="dashboard-content-grid" style={{ marginTop: "2rem" }}>
                <div className="card welcome-card">
                    <h3>Academic Progress</h3>
                    <p>Keep up the great work! Your current GPA is being tracked.</p>
                </div>
            </div>
        </div>
    );
}
