import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Grades.module.css";
import Navbar from "../component/Navbar/navBar";

type Grade = {
  section_id: number;
  student_id: string;
  result: string;
  points_earned: number;
  AlphaGrade: string;
  graded_date: string;
  enrollment_id: number;
};

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("studentId"); // ✅ must be stored when login

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/course/grades/student/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // backend returns { success, grades: [...] }
        setGrades(res.data.grades || []);
      } catch (err) {
        console.error("❌ Error fetching grades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentId, token]);

  if (loading) return <p>Loading grades...</p>;

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
              <th>Section</th>
              <th>Student ID</th>
              <th>Result</th>
              <th>Points Earned</th>
              <th>Alpha Grade</th>
              <th>Graded Date</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? (
              grades.map((g, i) => (
                <tr key={i}>
                  <td>{g.section_id}</td>
                  <td>{g.student_id}</td>
                  <td>{g.result}</td>
                  <td>{g.points_earned}</td>
                  <td>{g.AlphaGrade}</td>
                  <td>{new Date(g.graded_date).toLocaleDateString()}</td>
                </tr>
              ))
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
