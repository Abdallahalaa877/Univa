import React, { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
  week: string;
  objectives: string[];
}

const Accordion: React.FC<AccordionProps> = ({ week, objectives }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button className={styles.header} onClick={() => setOpen(!open)}>
        {week} <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className={styles.content}>
          <h4>Learning Objectives:</h4>
          <ul>
            {objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
