import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";

// استورد النوع من الـ types مباشرة
import type { CalendarProps } from "react-calendar";

export default function MyCalendar() {
  const [value, setValue] = useState<Date | [Date, Date] | null>(new Date());

  return (
    <div className={styles.calendar}>
      <h3>Schedule</h3>
      <Calendar
        onChange={setValue as CalendarProps["onChange"]}
        value={value}
        className={styles.reactCalendar}
      />
    </div>
  );
}
