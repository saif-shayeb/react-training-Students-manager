import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user } = useAuth();

    const fetchCourses = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const res = await api.get("/courses/");
            setCourses(res.data);
        } catch (e) {
            console.error("Failed to fetch courses", e);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchMyCourses = useCallback(async () => {
        if (!isAuthenticated || user?.type !== "student") return;
        try {
            const res = await api.get("/courses/my");
            setMyCourses(res.data);
        } catch (e) {
            console.error("Failed to fetch my courses", e);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        fetchCourses();
        if (user?.type === "student") {
            fetchMyCourses();
        }
    }, [fetchCourses, fetchMyCourses, user]);

    const addCourse = async (courseData) => {
        try {
            await api.post("/courses/", courseData);
            fetchCourses();
            toast.success("Course added successfully");
            return { status: "success" };
        } catch (e) {
            toast.error(e.response?.data?.error || "Failed to add course");
            return { status: "error" };
        }
    };

    const updateCourse = async (id, courseData) => {
        try {
            await api.put(`/courses/${id}`, courseData);
            fetchCourses();
            toast.success("Course updated successfully");
            return { status: "success" };
        } catch (e) {
            toast.error(e.response?.data?.error || "Failed to update course");
            return { status: "error" };
        }
    };

    const deleteCourse = async (id) => {
        try {
            await api.delete(`/courses/${id}`);
            fetchCourses();
            toast.success("Course deleted successfully");
            return { status: "success" };
        } catch (e) {
            toast.error(e.response?.data?.error || "Failed to delete course");
            return { status: "error" };
        }
    };

    const enrollCourse = async (courseId) => {
        try {
            await api.post("/courses/enroll", { course_id: courseId });
            fetchMyCourses();
            toast.success("Enrolled successfully");
            return { status: "success" };
        } catch (e) {
            toast.error(e.response?.data?.error || "Failed to enroll");
            return { status: "error" };
        }
    };

    return (
        <CourseContext.Provider value={{
            courses,
            myCourses,
            loading,
            addCourse,
            updateCourse,
            deleteCourse,
            enrollCourse,
            refreshCourses: fetchCourses
        }}>
            {children}
        </CourseContext.Provider>
    );
}

export const useCourses = () => useContext(CourseContext);
