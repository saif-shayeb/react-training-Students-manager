import React, { useState } from "react";
import { useCourses } from "../contexts/CourseContext";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus, FaTrash, FaEdit, FaBookOpen } from "react-icons/fa";
import CustomBtn from "../components/CustomBtn";

export default function Courses() {
    const { courses, myCourses, loading, addCourse, updateCourse, deleteCourse, enrollCourse } = useCourses();
    const { user } = useAuth();
    const isAdmin = user?.type === "admin";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", instructor: "", credits: 3 });

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({ name: course.name, description: course.description, instructor: course.instructor, credits: course.credits });
        } else {
            setEditingCourse(null);
            setFormData({ name: "", description: "", instructor: "", credits: 3 });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingCourse) {
            await updateCourse(editingCourse.id, formData);
        } else {
            await addCourse(formData);
        }
        setIsModalOpen(false);
    };

    const isEnrolled = (courseId) => myCourses.some(c => c.id === courseId);

    if (loading) return <div className="dashboard-container"><h2>Loading courses...</h2></div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
                <h2 className="dashboard-title" style={{ marginBottom: '0.25rem' }}>My Personal Dashboard</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Welcome back, {user?.name}! Here's your academic summary.</p>
            </div>

            <div className="grid-base" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}>
                <div className="card glass details-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontSize: '1.25rem',
                        marginBottom: '1rem'
                    }}>
                        <FaBookOpen />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Course Catalog</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Explore and manage academic programs</p>
                    {isAdmin && (
                        <CustomBtn onClick={() => handleOpenModal()} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                        }}>
                            <FaPlus /> Add New Course
                        </CustomBtn>
                    )}
                </div>

                {courses.map(course => (
                    <div key={course.id} className="card glass course-card" style={{
                        padding: "0",
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'var(--transition)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-surface)'
                    }}>
                        <div style={{
                            height: '8px',
                            background: isEnrolled(course.id) ? 'var(--secondary)' : 'linear-gradient(90deg, var(--primary), #818cf8)'
                        }}></div>

                        <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: '1.25rem' }}>
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    borderRadius: '0.75rem',
                                    backgroundColor: 'var(--primary-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    fontSize: '1.25rem'
                                }}>
                                    <FaBookOpen />
                                </div>
                                {isAdmin && (
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <button onClick={() => handleOpenModal(course)} style={{
                                            color: "var(--text-muted)",
                                            padding: '0.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            transition: 'var(--transition)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} title="Edit Course"><FaEdit /></button>
                                        <button onClick={() => deleteCourse(course.id)} style={{
                                            color: "var(--danger)",
                                            padding: '0.5rem',
                                            borderRadius: 'var(--radius-md)',
                                            transition: 'var(--transition)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} title="Delete Course"><FaTrash /></button>
                                    </div>
                                )}
                            </div>

                            <h3 style={{ marginBottom: "0.75rem", fontSize: '1.25rem', fontWeight: 700 }}>{course.name}</h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                                {course.description}
                            </p>

                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>{course.instructor}</p>
                                    <span style={{
                                        display: 'inline-block',
                                        marginTop: '0.25rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        color: 'var(--primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>{course.credits} Credits</span>
                                </div>
                                {!isAdmin && (
                                    <button
                                        onClick={() => !isEnrolled(course.id) && enrollCourse(course.id)}
                                        disabled={isEnrolled(course.id)}
                                        style={{
                                            padding: '0.625rem 1.25rem',
                                            fontSize: '0.875rem',
                                            fontWeight: 700,
                                            borderRadius: 'var(--radius-md)',
                                            cursor: isEnrolled(course.id) ? 'default' : 'pointer',
                                            backgroundColor: isEnrolled(course.id) ? 'var(--secondary)' : 'transparent',
                                            color: isEnrolled(course.id) ? 'white' : 'var(--primary)',
                                            border: `1px solid ${isEnrolled(course.id) ? 'var(--secondary)' : 'var(--primary)'}`,
                                            transition: 'var(--transition)'
                                        }}
                                    >
                                        {isEnrolled(course.id) ? "Enrolled" : "Enroll Now"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(2, 6, 23, 0.85)",
                    backdropFilter: 'blur(8px)',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div className="card" style={{
                        width: "90%",
                        maxWidth: "500px",
                        padding: "2.5rem",
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-surface)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>Fill in the details below to {editingCourse ? 'update' : 'create'} the course catalog entry.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{ marginBottom: "1.25rem", display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Course Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-main)',
                                        color: 'var(--text-main)',
                                        outline: 'none',
                                        transition: 'var(--transition)'
                                    }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: "1.25rem", display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-main)',
                                        color: 'var(--text-main)',
                                        resize: 'none',
                                        outline: 'none',
                                        transition: 'var(--transition)'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Instructor</label>
                                    <input
                                        type="text"
                                        value={formData.instructor}
                                        onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-main)',
                                            color: 'var(--text-main)',
                                            outline: 'none',
                                            transition: 'var(--transition)'
                                        }}
                                    />
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Credits</label>
                                    <input
                                        type="number"
                                        value={formData.credits}
                                        onChange={e => setFormData({ ...formData, credits: parseInt(e.target.value) })}
                                        min="1"
                                        max="10"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-main)',
                                            color: 'var(--text-main)',
                                            outline: 'none',
                                            transition: 'var(--transition)'
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", alignItems: 'center' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-main)',
                                        border: '1px solid var(--border)',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        transition: 'var(--transition)'
                                    }}>
                                    Cancel
                                </button>
                                <CustomBtn type="submit" style={{ padding: '0.75rem 2rem' }}>
                                    {editingCourse ? "Update Course" : "Create Course"}
                                </CustomBtn>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
