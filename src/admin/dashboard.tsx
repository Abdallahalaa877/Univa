import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import SideBar from "./sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Announcement {
  id?: number;
  announcement_id?: number;
  title: string;
  content: string;
  course_section_id: string;
}

interface Course {
  id: number;
  course_code: string;
  course_name: string;
}

interface Ticket {
  ticket_id: number;
  student_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [facultyCount, setFacultyCount] = useState<number>(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // ✅ Fetch Students
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/users/students", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const students = Array.isArray(res.data) ? res.data : res.data.data || [];
        setStudentCount(students.length);
      })
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // ✅ Fetch Faculties
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/users/faculties", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const faculties = Array.isArray(res.data) ? res.data : res.data.data || [];
        setFacultyCount(faculties.length);
      })
      .catch((err) => console.error("Error fetching faculties:", err));
  }, []);

  // ✅ Fetch Courses
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const coursesData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setCourses(coursesData);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // ✅ Fetch Tickets
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/support-tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const ticketsData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setTickets(ticketsData);
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  // ✅ Fetch Announcements
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/announcement", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        setAnnouncements(Array.isArray(res.data) ? res.data : res.data.data || [])
      )
      .catch((err) => console.error("Error fetching announcements:", err));
  }, []);

  // ✅ Calculations
  const totalCourses = courses.length;
  const pendingTickets = tickets.filter((t) => t.status === "Open").length;

  return (
    <div style={{ display: "flex" }}>
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
            <p className={styles.value}>{studentCount}</p>
          </div>
          <div className={styles.card}>
            <h3>Faculty</h3>
            <p className={styles.value}>{facultyCount}</p>
          </div>
          <div className={styles.card}>
            <h3>Courses</h3>
            <p className={styles.value}>{totalCourses}</p>
          </div>
          <div className={styles.card}>
            <h3>Pending Tickets</h3>
            <p className={styles.value}>{pendingTickets}</p>
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
                          console.log("delete announcement", announcementId)
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
