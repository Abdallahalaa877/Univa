import React, { useState } from "react";
import styles from "./CourseDetails.module.css";
import Tabs from "../component/CourseDetails/Tabs";
import CourseInfo from "../component/CourseDetails/CourseInfo";
import Assignments from "../component/CourseDetails/Assignments";
import Accordion from "../component/CourseDetails/Accordion";
import Navbar from "../component/Navbar/navBar";


const CourseDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const modules = [
    {
      week: "Week 1 – Introduction to AI",
      objectives: [
        "Understand AI history & applications",
        "Recognize AI’s role in modern technology",
        "Recognize AI’s role in modern technology",
      ],
    },
    {
      week: "Week 2 – Search Algorithms",
      objectives: [],
    },
    {
      week: "Week 3 – Knowledge Representation",
      objectives: [],
    },
  ];

  return (
    <>
      {/* ✅ Navbar at the top */}
      <Navbar onLoginClick={() => console.log("Login clicked")} />

      <div className={styles.container}>
        {/* Left Side */}
        <div className={styles.left}>
          <div className={styles.header}>
            <img
              src="/course-thumbnail.png"
              alt="AI Course"
              className={styles.courseImage}
            />
            <div>
              <h2>CS302 – Artificial Intelligence Fundamentals</h2>
              <p>Dr. Sarah Mahmoud</p>
              <div className={styles.badges}>
                <span className={styles.badge}>3 Hr</span>
                <span className={styles.badge}>CS</span>
                <span className={styles.badge}>AI</span>
              </div>
              <p className={styles.description}>
                This course introduces students to the core concepts of Artificial
                Intelligence, covering problem-solving, search strategies,
                knowledge representation, and basic machine learning techniques.
                Students will implement AI solutions in small projects.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Weekly Modules */}
          <h3 className={styles.sectionTitle}>Weekly Modules</h3>
          {modules.map((mod, i) => (
            <Accordion key={i} week={mod.week} objectives={mod.objectives} />
          ))}
        </div>

        {/* Right Side */}
        <div className={styles.right}>
          <CourseInfo />
          <Assignments />
        </div>
      </div>
    </>
  );
};
export default CourseDetails;
