import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import Navbar from "../component/Navbar/navBar";
import axios from "axios";

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
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/announcement",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCards(
          response.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.content,
            type: "Announcement" as const,
          }))
        );
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter by tab + search term
  const filteredCards = cards
    .filter((c) =>
      activeTab === "All"
        ? true
        : c.type.toLowerCase() === activeTab.toLowerCase().slice(0, -1)
    )
    .filter((c) =>
      (c.title + " " + c.description)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.hero}>
          <div>
            <h2>Welcome to Your Dashboard</h2>
            <p>Stay updated with announcements, events, and deadlines.</p>
          </div>
        </div>

        <div className={styles.main}>
          {/* Left Column */}
          <div className={styles.content}>
            {/* Search Bar */}
            <input
              type="text"
              className={styles.search}
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

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
              {loading ? (
                <p>Loading...</p>
              ) : filteredCards.length > 0 ? (
                filteredCards.map((card) => (
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
                ))
              ) : (
                <p>No items found.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Upcoming Deadlines / Events / Quick Links */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
