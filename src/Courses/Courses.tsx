import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import { Plus } from "lucide-react";
import Navbar from "../component/Navbar/navBar";


interface Course {
  id: string;
  code: string;
  title: string;
  professor: string;
  credit: string;
  dep: string;
  days: string;
  time: string;
  location: string;
}

const courses: Course[] = [
  {
    id: "cs302",
    code: "CS302",
    title: "Artificial Intelligence Fundamentals",
    professor: "Dr. Sarah Mahmoud",
    credit: "3Hr",
    dep: "CS, AI",
    days: "Mon & Wed",
    time: "10:00–11:30AM",
    location: "Room 205 – Engineering Building",
  },
  {
    id: "cs310",
    code: "CS310",
    title: "Data Structures",
    professor: "Dr. Ahmed Ali",
    credit: "3Hr",
    dep: "CS",
    days: "Tue & Thu",
    time: "12:00–1:30PM",
    location: "Room 110 – Engineering Building",
  },
];

const deadlines = [
  { id: 1, title: "AI - Assignment 3", date: new Date(2022, 4, 5) }, // 5 May
  { id: 2, title: "AI - Assignment 3", date: new Date(2022, 4, 7) }, // 7 May
  { id: 3, title: "AI - Assignment 3", date: new Date(2022, 4, 11) }, // 11 May
];

// ------------------ Calendar Component ------------------
const Calendar: React.FC<{ deadlines: typeof deadlines }> = ({ deadlines }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 4, 1)); // May 2022
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // weekday of 1st
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const deadlineDays = deadlines
    .filter((d) => d.date.getMonth() === month && d.date.getFullYear() === year)
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
          {currentDate.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h4>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      <div className={styles.weekdays}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {weeks.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) =>
              day ? (
                <div
                  key={j}
                  className={`${styles.day} ${
                    deadlineDays.includes(day) ? styles.deadlineDay : ""
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

  return (
    <>
    {}
    <Navbar/>
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
          {courses.map((c, i) => (
            <div
              key={c.id}
              className={styles.courseCard}
              onClick={() => i === 0 && navigate(`/coursedetails`)}
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
