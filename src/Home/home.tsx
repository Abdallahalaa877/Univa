import React, { useState } from "react";
import styles from "./home.module.css";
import Navbar from "../component/Navbar/navBar";


type CardType = "Announcement" | "Event" | "Deadline" | "Resource";

interface Card {
  id: number;
  title: string;
  description: string;
  type: CardType;
}

const tabs = ["All", "Announcements", "Events", "Deadlines", "Resources"];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Example data (can come from API later)
  const cards: Card[] = [
    {
      id: 1,
      title: "Career Fair 2024",
      description:
        "Connect with top employers at the annual Career Fair. Bring your resume and dress professionally.",
      type: "Event",
    },
    {
      id: 2,
      title: "Campus-Wide Safety Drill",
      description:
        "A mandatory safety drill will be conducted on campus to ensure preparedness for emergencies.",
      type: "Announcement",
    },
    {
      id: 3,
      title: "AI - Assignment 3",
      description: "Submit assignment before 5 May 11:59.",
      type: "Deadline",
    },
    {
      id: 4,
      title: "Student Handbook",
      description: "The updated student handbook is now available online.",
      type: "Resource",
    },
  ];

  // Filter cards by tab
  const filteredCards =
    activeTab === "All"
      ? cards
      : cards.filter((c) => c.type.toLowerCase() === activeTab.toLowerCase().slice(0, -1));

  return (
     <>
              {/* ✅ Navbar at the top */}
              <Navbar />
    <div className={styles.dashboard}>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <div>
          <h2>Join our Event with Career Fair 2024</h2>
          <p>Explore opportunities with top employers and connect with professionals.</p>
        </div>
        <button className={styles.heroButton}>Join Now</button>
      </div>

      <div className={styles.main}>
        {/* Left Column */}
        <div className={styles.content}>
          {/* Search Bar */}
          <input type="text" className={styles.search} placeholder="Search" />

          {/* Tabs */}
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className={styles.cards}>
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className={`${styles.card} ${
                  card.type === "Event"
                    ? styles.event
                    : card.type === "Announcement"
                    ? styles.announcement
                    : card.type === "Deadline"
                    ? styles.deadline
                    : styles.resource
                }`}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className={styles.tag}>{card.type}</span>
              </div>
            ))}
          </div>
        </div>

     {/* Sidebar */}
<div className={styles.sidebar}>
  {/* Upcoming Deadlines */}
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <h4>Upcoming Deadlines</h4>
      <span className={styles.arrow}>➔</span>
    </div>

    <div className={styles.deadlineCard + " " + styles.primaryCard}>
      <div className={styles.deadlineLeft}>
        <div className={styles.day}>05</div>
        <div>
          <div className={styles.deadlineTitle}>AI - Assignment 3</div>
          <div className={styles.deadlineSubtitle}>3–5 Students</div>
        </div>
      </div>
      <div className={styles.deadlineTime}>05 May - 11:59</div>
    </div>

    <div className={styles.deadlineCard}>
      <div className={styles.deadlineLeft}>
        <div className={styles.day}>07</div>
        <div>
          <div className={styles.deadlineTitle}>AI - Assignment 3</div>
          <div className={styles.deadlineSubtitle}>3–5 Students</div>
        </div>
      </div>
      <div className={styles.deadlineTimeAlt}>07 May - 11:59</div>
    </div>
  </div>

  {/* Upcoming Events */}
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <h4>Upcoming Events</h4>
      <span className={styles.arrow}>➔</span>
    </div>

    <div className={styles.eventCard + " " + styles.primaryCard}>
      <div className={styles.eventLeft}>
        <div className={styles.iconBox}>🎓</div>
        <div>
          <div className={styles.eventTitle}>Career Fair</div>
          <div className={styles.eventSubtitle}>Lab 7</div>
        </div>
      </div>
      <div className={styles.eventTime}>05 May - 11:59</div>
    </div>

    <div className={styles.eventCard1}>
      <div className={styles.eventLeft}>
        <div className={styles.iconBoxAlt}>🤝</div>
        <div>
          <div className={styles.eventTitleAlt}>Alumni Networking</div>
          <div className={styles.eventSubtitleAlt}>Lab 7</div>
        </div>
      </div>
      <div className={styles.eventTimeAlt}>07 May - 11:59</div>
    </div>
  </div>

  {/* Quick Links */}
  <div className={styles.section}>
    <h4 className={styles.linksHeader}>Quick Links</h4>
    <div className={styles.linkItem}>
      <div className={styles.linkIcon}>📅</div>
      <span>Academic Calendar</span>
    </div>
    <div className={styles.linkItem}>
      <div className={styles.linkIcon}>📘</div>
      <span>Student Handbook</span>
    </div>
    <div className={styles.linkItem}>
      <div className={styles.linkIcon}>💻</div>
      <span>IT Support</span>
    </div>
  </div>
</div>
    </div>
    </div>
    </>
  );
};

export default Dashboard;
