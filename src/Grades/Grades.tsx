import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Grades.module.css";
import Navbar from "../component/Navbar/navBar";

type Grade = {
  section_id: number;
  student_id: string;
  result: string | null;
  points_earned: number | null;
  AlphaGrade: string | null;
  graded_date: string | null;
  enrollment_id: number;
  course_code: string;
  section_number: string;
  course_name: string; // added course_name
};

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
      setError("User not logged in or token missing.");
      setLoading(false);
      return;
    }

    let studentId: string;
    try {
      const user = JSON.parse(userRaw);
      studentId = user.username; // use username as student ID
    } catch (err) {
      setError("Failed to parse user info.");
      setLoading(false);
      return;
    }

    const fetchGrades = async () => {
        
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/course/grades/student/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data && Array.isArray(res.data.data)) {
            console.log(res.data.data);
            
         const mapped: Grade[] = res.data.data.map((item: any) => ({
  enrollment_id: item.enrollment_id,
  section_id: item.section_id,
  student_id: item.student_id,
  result: item.result,
  points_earned: item.result,
  AlphaGrade: item.final_grade,
  graded_date: item.grading_date || null,
  course_code: item.course_section?.course?.course_code,
  section_number: item.course_section?.section_number,
  course_name: item.course_section?.course?.course_name, // <-- add this
}));


          setGrades(mapped);
          console.log(mapped);
          
        } else {
          setGrades([]);
        }
      } catch (err: any) {
        console.error("❌ Error fetching grades:", err.response || err);
        setError("Failed to fetch grades. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  if (loading) return <p>Loading grades...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Grades</h1>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course</th>
              
              <th>Result</th>
              <th>Alpha Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? (
              grades.map((g, i) => {
                
                const isGradProject =
                  g.course_code === "CS99" || g.section_number === "GradProject";
                return (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: isGradProject ? "#fff4e5" : "transparent",
                      fontWeight: isGradProject ? "bold" : "normal",
                    }}
                  >
                    <td>{g.course_name }</td>
                    <td>{g.result ?? "-"}</td>
                    <td>{g.AlphaGrade ?? "-"}</td>
                   
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No grades available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
