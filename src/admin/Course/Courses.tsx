import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./courses.module.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";

interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  description: string;
  credit_hours: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Fetch courses
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("API Response:", res.data);
        const coursesData = Array.isArray(res.data) ? res.data : res.data.data;
        setCourses(coursesData || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching courses:", err.response || err);
        setCourses([]);
      });
  }, [token]);

  // ✅ Delete a course
  const deleteCourse = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/course-delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(courses.filter((course) => course.course_id !== id));
      alert("Course deleted ✅");
    } catch (err) {
      console.error("❌ Error deleting course:", err);
      alert("Failed to delete course");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.coursesPage}>
        <div className={styles.header}>
          <h2>Courses</h2>
          <button
            className={styles.addCourseBtn}
            onClick={() => navigate("/addnewcourse")}
          >
            Add new course
          </button>
        </div>

        {/* Table */}
        <table className={styles.coursesTable}>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Description</th>
              <th>Credit Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_code}</td>
                  <td>{course.course_name}</td>
                  <td>{course.description}</td>
                  <td>{course.credit_hours}</td>
                  <td>
                    {/* 👇 Navigate to edit page */}
                    <button
                      className={styles.editBtn}
                      onClick={() => navigate(`/courses/edit/${course.course_id}`)}
                    >
                      Edit
                    </button>

                    {/* 👇 Delete course */}
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteCourse(course.course_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noData}>
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
