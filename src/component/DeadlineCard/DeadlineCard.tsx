import styles from "./DeadlineCard.module.css";

interface DeadlineCardProps {
  date: string;
  title: string;
  due: string;
}

export default function DeadlineCard({ date, title, due }: DeadlineCardProps) {
  return (
    <div className={styles.deadline}>
      <div className={styles.date}>{date}</div>
      <div>
        <p>{title}</p>
        <span>{due}</span>
      </div>
    </div>
  );
}
