import { useState } from "react";
import CalendarLib from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";

export default function Calendar() {
  // Accept null too
const [value, setValue] = useState<[Date, Date] | null>(null);

  return (
    <div className={styles.calendar}>
      <h3>Schedule</h3>
      <CalendarLib
        onChange={setValue as CalendarProps["onChange"]}
        value={value}
        className={styles.reactCalendar}
      />
    </div>
  );
}
