import React, { useState } from "react";
import styles from "./SubmitRequest.module.css";
import Navbar from "../component/Navbar/navBar";


const SubmitRequest: React.FC = () => {
  const [priority, setPriority] = useState("Low");

  return (
    <>
          {/* ✅ Navbar at the top */}
          <Navbar />
    <div className={styles.container}>
      <h2 className={styles.title}>Submit a Request</h2>

      <form>
        {/* Subject */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Subject</label>
          <input
            type="text"
            placeholder="Enter a subject"
            className={styles.input}
          />
        </div>

        {/* Category */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select className={styles.select}>
            <option>Select a category</option>
            <option>Technical Issue</option>
            <option>Academic</option>
            <option>General</option>
          </select>
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            placeholder="Enter a description"
            className={styles.textarea}
          ></textarea>
        </div>

        {/* Attachment */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Attachment <span className={styles.attachmentNote}>(optional)</span>
          </label>
          <input type="file" className={styles.input} />
        </div>

        {/* Priority */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Priority</label>
          <div className={styles.priorityGroup}>
            {["Low", "Medium", "High"].map((level) => (
              <button
                type="button"
                key={level}
                className={`${styles.priorityButton} ${
                  priority === level ? styles.active : ""
                }`}
                onClick={() => setPriority(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
     </>
  );
};

export default SubmitRequest;
