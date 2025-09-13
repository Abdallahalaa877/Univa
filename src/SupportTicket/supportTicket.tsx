import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./supportTicket.module.css";
import Navbar from "../component/Navbar/navBar";


const SupportTickets: React.FC = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      id: "#12345",
      subject: "Issue with Course Registration",
      category: "Registration",
      status: "Open",
      dateSubmitted: "2024-07-26",
      lastUpdate: "2024-07-27",
      priority: "High",
    },
    {
      id: "#12346",
      subject: "Cannot Access Lecture Materials",
      category: "Course Materials",
      status: "In Progress",
      dateSubmitted: "2024-07-25",
      lastUpdate: "2024-07-26",
      priority: "Medium",
    },
    {
      id: "#12347",
      subject: "Payment Confirmation Needed",
      category: "Billing",
      status: "Resolved",
      dateSubmitted: "2024-07-24",
      lastUpdate: "2024-07-25",
      priority: "Low",
    },
    {
      id: "#12348",
      subject: "Technical Issue with Online Exam",
      category: "Exams",
      status: "Closed",
      dateSubmitted: "2024-07-23",
      lastUpdate: "2024-07-24",
      priority: "High",
    },
    {
      id: "#12349",
      subject: "Request for Transcript",
      category: "Transcripts",
      status: "Open",
      dateSubmitted: "2024-07-22",
      lastUpdate: "2024-07-23",
      priority: "Medium",
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return styles.open;
      case "In Progress":
        return styles.inProgress;
      case "Resolved":
        return styles.resolved;
      case "Closed":
        return styles.closed;
      default:
        return "";
    }
  };

  return (
     <>
          {/* ✅ Navbar at the top */}
          <Navbar />
    <div className={styles.container}>
      <h2>Support Tickets</h2>
      <button
        className={styles.newTicketButton}
        onClick={() => navigate("/SubmitRequest")}
      >
        New Ticket
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Subject</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date Submitted</th>
            <th>Last Update</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.category}</td>
              <td>
                <span className={`${styles.status} ${getStatusClass(ticket.status)}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.dateSubmitted}</td>
              <td>{ticket.lastUpdate}</td>
              <td>{ticket.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default SupportTickets;
