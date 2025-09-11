import React from "react";
import AssignmentCard from "./AssignmentCard";
import styles from "./CourseDetails.module.css";

const Assignments: React.FC = () => {
  const assignments = [
    { id: 1, title: "AI - Assignment 3", date: "05 May - 11:59", students: "3-5 Students", highlight: true },
    { id: 2, title: "AI - Assignment 3", date: "05 May - 11:59", students: "3-5 Students" },
    { id: 3, title: "AI - Assignment 3", date: "05 May - 11:59", students: "3-5 Students" },
  ];

  return (
    <div className={styles.assignments}>
      <h3>Assignments</h3>
      {assignments.map((a) => (
        <AssignmentCard key={a.id} {...a} />
      ))}
    </div>
  );
};

export default Assignments;
