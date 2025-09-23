import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import SideBar from "../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Announcement {
  id?: number;
  announcement_id?: number;
  title: string;
  content: string;
  course_section_id: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // ✅ Fetch announcements on load
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/announcement", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  // ✅ Delete announcement
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/announcements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements((prev) =>
        prev.filter((a) => (a.id || a.announcement_id) !== id)
      );
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SideBar />

      <div className={styles.dashboard}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Dashboard</h2>
          <button
            className={styles.addPost}
            onClick={() => navigate("/announcement")}
          >
            Add Post
          </button>
        </div>

        {/* Stats Cards */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Total Students</h3>
            <p className={styles.value}>1,250</p>
          </div>
          <div className={styles.card}>
            <h3>Faculty</h3>
            <p className={styles.value}>120</p>
          </div>
          <div className={styles.card}>
            <h3>Courses</h3>
            <p className={styles.value}>85</p>
          </div>
          <div className={styles.card}>
            <h3>Pending Tickets</h3>
            <p className={styles.value}>15</p>
          </div>
        </div>

        {/* Announcements */}
        <div className={styles.announcementsHeader}>
          <h3>Announcements</h3>
        </div>

        <div className={styles.announcements}>
          {announcements.length === 0 ? (
            <p>No announcements found</p>
          ) : (
            announcements.map((a) => {
              const announcementId = a.id || a.announcement_id;
              return (
                <div key={announcementId} className={styles.announcementCard}>
                  <div>
                    <div className={styles.announcementTitleRow}>
                      <h4>{a.title}</h4>
                      <span className={styles.eventTag}>
                        Section {a.course_section_id}
                      </span>
                    </div>
                    <p>{a.content}</p>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() =>
                          navigate(`/announcement/edit/${announcementId}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() =>
                          handleDelete(announcementId!)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
