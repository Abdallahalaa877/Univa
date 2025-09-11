import styles from "./CourseCard.module.css";

interface CourseCardProps {
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  location: string;
}

export default function CourseCard({ code, title, instructor, schedule, location }: CourseCardProps) {
  return (
    <div className={styles.card}>
      <img src="/vite.svg" alt="course" className={styles.icon} />
      <div className={styles.info}>
        <h3>{code} – {title}</h3>
        <p>{instructor}</p>
        <p>{schedule}</p>
        <p>{location}</p>
      </div>
    </div>
  );
}
