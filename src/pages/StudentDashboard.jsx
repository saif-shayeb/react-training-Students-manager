import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { StudentsListContext } from "../contexts/StudentContext";
import { FaUserGraduate, FaTable } from "react-icons/fa";
import CustomBtn from "../components/CustomBtn";

import { useCourses } from "../contexts/CourseContext";

export default function StudentDashboard() {
    const { user } = useAuth();
    const { studentsList, loading } = useContext(StudentsListContext);
    const { myCourses } = useCourses();
    const navigate = useNavigate();

    const studentData = studentsList.find(s => s.email === user?.email);

    if (loading) {
        return <div className="dashboard-container"><h2>Loading your information...</h2></div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
                <h2 className="dashboard-title" style={{ marginBottom: '0.25rem' }}>My Personal Dashboard</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Welcome back, {user?.name}! Here's your academic summary.</p>
            </div>

            <div className="grid-base" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}>
                <div className="card glass details-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontSize: '1.5rem',
                        marginBottom: '1rem',
                        boxShadow: '0 8px 16px rgba(79, 70, 229, 0.1)'
                    }}>
                        <FaUserGraduate />
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Student Profile</h2>

                    {studentData ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Full Name</span>
                                <span style={{ fontWeight: 700 }}>{studentData.firstName} {studentData.lastName}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Email Address</span>
                                <span style={{ fontWeight: 700 }}>{studentData.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Birth Date</span>
                                <span style={{ fontWeight: 700 }}>{studentData.birthDate?.split("T")[0]}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-lg)' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Academic Performance</span>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                                    {studentData.gpa} GPA
                                </h3>
                            </div>
                        </div>
                    ) : (
                        <div className="details-empty" style={{ padding: '2rem' }}>
                            <FaTable style={{ fontSize: '3rem', opacity: 0.1, marginBottom: '1rem' }} />
                            <p style={{ color: 'var(--text-muted)' }}>We couldn't find your student record. Please contact the administrator.</p>
                        </div>
                    )}
                </div>

                <div className="card glass welcome-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>My Enrolled Courses</h3>
                        <span style={{
                            padding: '0.375rem 0.75rem',
                            backgroundColor: 'var(--secondary)',
                            color: 'white',
                            borderRadius: '2rem',
                            fontSize: '0.75rem',
                            fontWeight: 700
                        }}>{myCourses.length} Active</span>
                    </div>

                    {myCourses.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {myCourses.map(course => (
                                <div key={course.id} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    padding: "1.25rem",
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    transition: 'var(--transition)',
                                    cursor: 'default'
                                }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>{course.name}</p>
                                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{course.instructor}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: 'var(--primary-light)',
                                            color: 'var(--primary)',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>{course.credits} Cr</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You are not enrolled in any courses yet.</p>
                            <CustomBtn onClick={() => navigate("/courses")}>Browse Catalog</CustomBtn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
