import React from "react";
import styles from "./AssignmentCard.module.css";

interface AssignmentProps {
  id: number;
  title: string;
  date: string;
  students: string;
  highlight?: boolean;
}

const AssignmentCard: React.FC<AssignmentProps> = ({ id, title, date, students, highlight }) => {
  return (
    <div className={`${styles.card} ${highlight ? styles.highlight : ""}`}>
      <div className={styles.left}>
        <span className={styles.date}>{id.toString().padStart(2, "0")}</span>
        <div>
          <h4>{title}</h4>
          <p>{students}</p>
        </div>
      </div>
      <span className={styles.deadline}>{date}</span>
    </div>
  );
};

export default AssignmentCard;
