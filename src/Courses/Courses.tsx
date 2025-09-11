import Navbar from "../component/Navbar/navBar";
import CourseCard from "../component/CourseCard/CourseCard";
import Calendar from "../component/Calender/Calendar";
import DeadlineCard from "../component/DeadlineCard/DeadlineCard";
import styles from "./Courses.module.css";

export default function Courses() {
  return (
    <div className={styles.page}>
     <Navbar onLoginClick={() => console.log("Login clicked")} />
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>My Courses</h2>
          <div className={styles.tabs}>
            <span className={styles.active}>Current</span>
            <span>All</span>
            <span>Completed</span>
          </div>

          <CourseCard
            code="CS302"
            title="Artificial Intelligence Fundamentals"
            instructor="Dr. Sarah Mahmoud | Credit: 3Hr | Dep: CS, AI"
            schedule="Mon & Wed 10:00–11:30AM"
            location="Room 205 – Engineering Building"
          />
          <CourseCard
            code="CS302"
            title="Artificial Intelligence Fundamentals"
            instructor="Dr. Sarah Mahmoud | Credit: 3Hr | Dep: CS, AI"
            schedule="Mon & Wed 10:00–11:30AM"
            location="Room 205 – Engineering Building"
          />
        </div>

        <div className={styles.right}>
          <Calendar />
          <h3>Deadlines</h3>
          <DeadlineCard date="05" title="AI – Assignment 3" due="05 May - 11:59" />
          <DeadlineCard date="07" title="AI – Assignment 3" due="07 May - 11:59" />
        </div>
      </div>
    </div>
  );
}
