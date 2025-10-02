import React, { useState, useEffect } from "react";
import styles from "./Enrollment.module.css";
import Navbar from "../component/Navbar/navBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CourseSection {
  id: number;
  section_number: string;
  course_code: string;
  title: string;
  credit: number;
  instructor: string;
  term: string;
}

const EnrollmentPage: React.FC = () => {
  const [enrolled, setEnrolled] = useState<CourseSection[]>([]);
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch available sections
  const fetchSections = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://127.0.0.1:8000/api/course/enrollments",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Map backend response to CourseSection interface
      const mappedSections = res.data.data.map((s: any) => ({
        id: s.section_id,
        section_number: s.section_number,
        course_code: s.course.course_code,
        title: s.course.course_name,
        credit: s.course.credit_hours,
        instructor: `Faculty ID: ${s.faculty_id}`,
        term: s.term.term_name,
      }));

      setSections(mappedSections);
      console.log(sections);
      
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Failed to load course sections. Please try again.");
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Toggle enrollment for a section
  const toggleEnroll = (section: CourseSection) => {
    if (enrolled.some((c) => c.id === section.id)) {
      setEnrolled(enrolled.filter((c) => c.id !== section.id));
    } else {
      setEnrolled([...enrolled, section]);
    }
  };

  // Submit enrolled sections
  const handleSubmit = async () => {
  if (enrolled.length === 0) return;
console.log(localStorage.getItem("token"));
  try {
    const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
    if (!user) {
      setError("User not found. Please log in again.");
      return;
    }
    const student_id = Number(JSON.parse(user).username); 

    const payload = {
      enrolments: enrolled.map((section) => ({
        student_id,
        section_id: section.id,
      })),
    };

    console.log("Submitting payload:", payload); // <-- log payload

    const res = await axios.post(
      "http://127.0.0.1:8000/api/course/enrollments",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Response:", res.data);
    setSuccess(true);
  } catch (err: any) {
    console.error("Enrollment failed:", err.response?.data || err.message);
    setError("Failed to submit enrollment. Please try again.");
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
        {/* Left side - Available Sections */}
        <div className={styles.coursesList}>
          <h2>Course Enrollment</h2>
          <p>Browse and enroll in available course sections.</p>

          {error && <p className={styles.error}>{error}</p>}
          {loading && <p>Loading...</p>}

          {!loading &&
            sections.map((section) => {
              const isEnrolled = enrolled.some((c) => c.id === section.id);
              return (
                <div key={section.id} className={styles.courseCard}>
                  <div className={styles.courseInfo}>
                    <span className={styles.courseCode}>
                      Course code: {section.course_code}
                    </span>
                    <h3>{section.title}</h3>
                    <p>
                      {section.instructor} | Credit: {section.credit} Hr
                    </p>
                    <p>Section: {section.section_number} | Term: {section.term}</p>
                  </div>

                  <div className={styles.courseActions}>
                    <button className={isEnrolled ? styles.dropBtn : styles.enrollBtn} 
                      onClick={() => toggleEnroll(section)}>
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
            <p>No sections selected yet</p>
          ) : (
            enrolled.map((section) => (
              <div key={section.id} className={styles.myCourseCard}>
                <span>{section.title}</span>
                <small>Credits: {section.credit} Hr</small>
                <button onClick={() => toggleEnroll(section)}>✖</button>
              </div>
            ))
          )}

          <p className={styles.totalCredits}>Total Credits: {totalCredits} Hr</p>

          <button
            className={styles.submitBtn}
                // should always show

            onClick={()=>{console.log("Button clicked!")
              handleSubmit()
                   // should always show

            }}
            disabled={enrolled.length === 0}
          >
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
