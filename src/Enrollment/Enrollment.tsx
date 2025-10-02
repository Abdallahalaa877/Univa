import React, { useState, useEffect } from "react";
import styles from "./Enrollment.module.css";
import Navbar from "../component/Navbar/navBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Course {
  id: number;
  code: string;
  title: string;
  instructor: string;
  credit: number;
  department: string;
  days: string;
  time: string;
  location: string;
  term: string; // comes from backend
}

interface AcademicTerm {
  id: number;
  name: string; // example: "Spring 2025"
}

const EnrollmentPage: React.FC = () => {
  const [enrolled, setEnrolled] = useState<Course[]>([]);
  const [success, setSuccess] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string>("");
  const [terms, setTerms] = useState<AcademicTerm[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  // Fetch academic terms from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/academic-terms", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTerms(res.data);
        if (res.data.length > 0) {
          setSelectedTerm(res.data[0].name); // default first term
        }
      })
      .catch((err) => console.error("Error fetching academic terms:", err));
  }, []);

  // Fetch courses when term changes
  useEffect(() => {
    if (!selectedTerm) return;
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Filter by selected term
        const filtered = res.data.filter(
          (course: Course) => course.term === selectedTerm
        );
        setCourses(filtered);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, [selectedTerm]);

  const toggleEnroll = (course: Course) => {
    if (enrolled.some((c) => c.id === course.id)) {
      setEnrolled(enrolled.filter((c) => c.id !== course.id)); // Drop
    } else {
      setEnrolled([...enrolled, course]); // Enroll
    }
  };

  const handleSubmit = () => {
    if (enrolled.length > 0) {
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://127.0.0.1:8000/api/course/enrollments",
          { courses: enrolled.map((c) => c.id) }, // send only course IDs
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => console.error("Error submitting enrollment:", err));
    }
  };

  const handleViewSchedule = () => {
    navigate("/schedule");
  };

  const totalCredits = enrolled.reduce((acc, c) => acc + c.credit, 0);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Left side - Available Courses */}
        <div className={styles.coursesList}>
          <h2>Course Enrollment</h2>
          <p>Browse and enroll in courses for the upcoming semester.</p>

          {/* Semester Dropdown */}
          <select
            className={styles.select}
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {terms.map((term) => (
              <option key={term.id} value={term.name}>
                {term.name}
              </option>
            ))}
          </select>

          {courses.map((course) => {
            const isEnrolled = enrolled.some((c) => c.id === course.id);

            return (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseInfo}>
                  <span className={styles.courseCode}>
                    Course code: {course.code}
                  </span>
                  <h3>{course.title}</h3>
                  <p>
                    {course.instructor} | Credit: {course.credit} Hr | Dep:{" "}
                    {course.department}
                  </p>
                  <p>
                    {course.days} | {course.time}
                  </p>
                  <p>{course.location}</p>
                </div>

                <div className={styles.courseActions}>
                  <button className={styles.viewBtn}>View More</button>
                  <button
                    className={isEnrolled ? styles.dropBtn : styles.enrollBtn}
                    onClick={() => toggleEnroll(course)}
                  >
                    {isEnrolled ? "Drop" : "Enroll"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side - My Courses */}
        <div className={styles.myCourses}>
          <h3>My Courses</h3>
          {enrolled.length === 0 ? (
            <p>No courses selected yet</p>
          ) : (
            enrolled.map((course) => (
              <div key={course.id} className={styles.myCourseCard}>
                <span>{course.title}</span>
                <small>Credits: {course.credit} Hr</small>
                <button onClick={() => toggleEnroll(course)}>✖</button>
              </div>
            ))
          )}

          <p className={styles.totalCredits}>
            Total Credits: {totalCredits} Hr
          </p>

          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit Enrollment
          </button>

          {success && (
            <div className={styles.successMessage}>
              <p>✅ Enrollment Successful</p>
              <button
                className={styles.scheduleBtn}
                onClick={handleViewSchedule}
              >
                View Schedule
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollmentPage;
