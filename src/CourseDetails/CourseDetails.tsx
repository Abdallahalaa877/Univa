import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CourseDetails.module.css";
import Tabs from "../component/CourseDetails/Tabs";
import CourseInfo from "../component/CourseDetails/CourseInfo";
import Assignments from "../component/CourseDetails/Assignments";
import Accordion from "../component/CourseDetails/Accordion";
import Navbar from "../component/Navbar/navBar";
import axios from "axios";

interface Module {
  week: string;
  objectives: string[];
}

interface CourseDetailsType {
  course_code: string;
  course_name: string;
  description: string;
  credit_hours: number;
  faculty_name: string;
  department: string;
  modules: Module[];
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // course section ID from URL
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState<CourseDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:8000/api/course-sections/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Assuming API returns a structure similar to previous course/enrollments response
        const data = res.data;
        setCourse({
          course_code: data.course.course_code,
          course_name: data.course.course_name,
          description: data.course.description,
          credit_hours: data.course.credit_hours,
          faculty_name: data.faculty_name || "Unknown",
          department: data.department || "N/A",
          modules: data.modules || [],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load course details.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>No course data found.</p>;

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {/* Left Side */}
        <div className={styles.left}>
          <div className={styles.header}>
            <img
              src="/course-thumbnail.png"
              alt={course.course_name}
              className={styles.courseImage}
            />
            <div>
              <h2>
                {course.course_code} – {course.course_name}
              </h2>
              <p>{course.faculty_name}</p>
              <div className={styles.badges}>
                <span className={styles.badge}>{course.credit_hours} Hr</span>
                <span className={styles.badge}>{course.department}</span>
              </div>
              <p className={styles.description}>{course.description}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Weekly Modules */}
          <h3 className={styles.sectionTitle}>Weekly Modules</h3>
          {course.modules.length > 0 ? (
            course.modules.map((mod, i) => (
              <Accordion key={i} week={mod.week} objectives={mod.objectives} />
            ))
          ) : (
            <p>No modules available.</p>
          )}
        </div>

        {/* Right Side */}
        <div className={styles.right}>
          <CourseInfo />
          <Assignments />
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
