import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./supportTicket.module.css";
import Navbar from "../component/Navbar/navBar";

interface Ticket {
  ticket_id: number;  // instead of id
  subject: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const SupportTickets: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token"); // 👈 adjust if stored differently
        const res = await axios.get("http://127.0.0.1:8000/api/my-support-tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTickets(res.data); // assuming API returns an array
      } catch (error: any) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <p>Loading tickets...</p>
        </div>
      </>
    );
  }

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

        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date Submitted</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td>#{ticket.ticket_id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.category}</td>
                  <td>
                    <span
                      className={`${styles.status} ${getStatusClass(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SupportTickets;
