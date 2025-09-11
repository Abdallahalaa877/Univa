import React from "react";
import styles from "../CourseDetails/CourseDetails.module.css";

const CourseInfo: React.FC = () => {
  return (
    <div className={styles.courseInfo}>
      <h3>Course Information</h3>
      <p>📅 Mon & Wed 10:00–11:30AM</p>
      <p>📍 Room 205 – Engineering Building</p>
      <p>⚡ Prerequisites: OOP – Object Oriented Programming</p>
    </div>
  );
};

export default CourseInfo;
