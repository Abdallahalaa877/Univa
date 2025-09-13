import React from "react";
import styles from "./Schedule.module.css";
import Navbar from "../component/Navbar/navBar";


interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credit: number;
  days: string;
  time: string;
  location: string;
  term: string;
}

// Sample enrolled courses
const enrolledCourses: Course[] = [
  {
    id: "CS101",
    code: "CS101",
    title: "Artificial Intelligence Fundamentals",
    instructor: "Dr. Sarah Mahmoud",
    credit: 3,
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
    days: "Tue & Thu",
    time: "1:00–2:30PM",
    location: "Room 101 – Science Building",
    term: "Spring 2025",
  },
  {
    id: "ENG101",
    code: "ENG101",
    title: "English Composition",
    instructor: "Dr. Emily Brown",
    credit: 3,
    days: "Mon & Wed",
    time: "2:00–3:30PM",
    location: "Room 12 – Arts Building",
    term: "Fall 2024",
  },
];

const SchedulePage: React.FC = () => {
  // Get unique terms
  const terms = Array.from(new Set(enrolledCourses.map((c) => c.term)));

  return (
    <>
    {}
    <Navbar/>
    <div className={styles.container}>
      <h2>My Schedule</h2>
      <p>Here’s an overview of your enrolled courses.</p>

      {terms.map((term) => (
        <div key={term} className={styles.termSection}>
          <h3>{term}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Credits</th>
                <th>Days</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses
                .filter((course) => course.term === term)
                .map((course) => (
                  <tr key={course.id}>
                    <td>
                      {course.code} – {course.title}
                    </td>
                    <td>{course.instructor}</td>
                    <td>{course.credit}</td>
                    <td>{course.days}</td>
                    <td>{course.time}</td>
                    <td>{course.location}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
        </>
  );
};

export default SchedulePage;
