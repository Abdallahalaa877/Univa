import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import { Plus } from "lucide-react";
import Navbar from "../component/Navbar/navBar";
import axios from "axios";

interface Course {
  id: number;
  code: string;
  title: string;
  professor: string;
  credit: string;
  dep: string;
  days?: string;
  time?: string;
  location?: string;
}

// ------------------ Calendar Component ------------------
const Calendar: React.FC<{ deadlines: any[] }> = ({ deadlines }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const deadlineDays = deadlines
    .filter(
      (d) =>
        d.date.getMonth() === month && d.date.getFullYear() === year
    )
    .map((d) => d.date.getDate());

  const weeks: (number | null)[][] = [];
  let dayCounter = 1 - firstDay;

  for (let w = 0; w < 6; w++) {
    const week: (number | null)[] = [];
    for (let d = 0; d < 7; d++) {
      if (dayCounter > 0 && dayCounter <= daysInMonth) {
        week.push(dayCounter);
      } else {
        week.push(null);
      }
      dayCounter++;
    }
    weeks.push(week);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth}>{"<"}</button>
        <h4>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {year}
        </h4>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      <div className={styles.weekdays}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
          (d) => (
            <div key={d}>{d}</div>
          )
        )}
      </div>

      <div className={styles.daysGrid}>
        {weeks.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) =>
              day ? (
                <div
                  key={j}
                  className={`${styles.day} ${
                    deadlineDays.includes(day)
                      ? styles.deadlineDay
                      : ""
                  }`}
                >
                  {day}
                </div>
              ) : (
                <div key={j} className={styles.empty}></div>
              )
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ------------------ Main Page ------------------
const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deadlines = [
    { id: 1, title: "AI - Assignment 3", date: new Date(2022, 4, 5) },
    { id: 2, title: "AI - Assignment 3", date: new Date(2022, 4, 7) },
    { id: 3, title: "AI - Assignment 3", date: new Date(2022, 4, 11) },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/course/enrollments",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Map API response to Course interface
        const fetchedCourses: Course[] = res.data.data.map(
          (item: any) => ({
            id: item.section_id,
            code: item.course.course_code,
            title: item.course.course_name,
            professor: item.faculty_id.toString(),
            credit: item.course.credit_hours + " Hr",
            dep: "N/A",
            days: "",
            time: "",
            location: "",
          })
        );

        setCourses(fetchedCourses);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <h2>My Courses</h2>
            <button
              className={styles.addBtn}
              onClick={() => navigate("/enroll")}
            >
              <Plus size={20} />
            </button>
          </div>
          <div className={styles.tabs}>
            <span className={styles.active}>Current</span>
            <span>All</span>
            <span>Completed</span>
          </div>

          <div className={styles.coursesList}>
            {loading && <p>Loading courses...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading &&
              courses.map((c) => (
                <div
                  key={c.id}
                  className={styles.courseCard}
                  onClick={() => navigate(`/coursedetails/${c.id}`)}
                >
                  <div className={styles.imageBox}></div>
                  <div>
                    <h3>
                      {c.code} – {c.title}
                    </h3>
                    <p className={styles.subText}>
                      {c.professor} | Credit: {c.credit} | Dep: {c.dep}
                    </p>
                    <p>📅 {c.days} &nbsp;&nbsp; 🕒 {c.time}</p>
                    <p>📍 {c.location}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <h3>Schedule</h3>
          <Calendar deadlines={deadlines} />

          <h3>Deadlines</h3>
          <div className={styles.deadlinesList}>
            {deadlines.map((d) => (
              <div key={d.id} className={styles.deadlineCard}>
                <div className={styles.deadlineDay}>
                  {d.date.getDate().toString().padStart(2, "0")}
                </div>
                <div className={styles.deadlineInfo}>
                  <p>{d.title}</p>
                  <small>
                    {d.date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    - 11:59
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
