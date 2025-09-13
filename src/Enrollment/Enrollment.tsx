import React, { useState } from "react";
import styles from "./Enrollment.module.css";
import Navbar from "../component/Navbar/navBar";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credit: number;
  department: string;
  days: string;
  time: string;
  location: string;
  term: string;
}

const coursesData: Course[] = [
  {
    id: "CS101",
    code: "CS101",
    title: "Artificial Intelligence Fundamentals",
    instructor: "Dr. Sarah Mahmoud",
    credit: 3,
    department: "CS, AI",
    days: "Mon & Wed",
    time: "10:00–11:30AM",
    location: "Room 205 – Engineering Building",
    term: "Spring 2025",
  },
  {
    id: "MATH201",
    code: "MATH201",
    title: "Calculus II",
    instructor: "Dr. John Smith",
    credit: 3,
    department: "Mathematics",
    days: "Tue & Thu",
    time: "1:00–2:30PM",
    location: "Room 101 – Science Building",
    term: "Fall 2024",
  },
  {
    id: "ENG101",
    code: "ENG101",
    title: "English Composition",
    instructor: "Dr. Emily Brown",
    credit: 3,
    department: "English",
    days: "Mon & Wed",
    time: "2:00–3:30PM",
    location: "Room 12 – Arts Building",
    term: "Spring 2024",
  },
];

const EnrollmentPage: React.FC = () => {
  const [enrolled, setEnrolled] = useState<Course[]>([]);
  const [success, setSuccess] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("Spring 2025");

  const navigate = useNavigate();

  const toggleEnroll = (course: Course) => {
    if (enrolled.some((c) => c.id === course.id)) {
      setEnrolled(enrolled.filter((c) => c.id !== course.id)); // Drop
    } else {
      setEnrolled([...enrolled, course]); // Enroll
    }
  };

  const handleSubmit = () => {
    if (enrolled.length > 0) {
      setSuccess(true);
    }
  };

  const handleViewSchedule = () => {
    navigate("/schedule"); // go to schedule page
  };

  const totalCredits = enrolled.reduce((acc, c) => acc + c.credit, 0);

  const terms = Array.from(new Set(coursesData.map((c) => c.term)));
  const filteredCourses = coursesData.filter((c) => c.term === selectedTerm);

  return (
    <>
    {}
    <Navbar/>
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
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>

        {filteredCourses.map((course) => {
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

        <p className={styles.totalCredits}>Total Credits: {totalCredits} Hr</p>

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
