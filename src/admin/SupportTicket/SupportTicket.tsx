import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";
import styles from "./SupportTicket.module.css";

interface Ticket {
  ticket_id: number;
  student_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}

const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
useEffect(() => {
  const token = localStorage.getItem("token");
  axios
    .get("http://127.0.0.1:8000/api/support-tickets", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const ticketsData = Array.isArray(res.data) ? res.data : res.data.data;
      setTickets(ticketsData || []);
    })
    .catch((err) => console.error("❌ Error fetching tickets:", err));
}, []);

const updateStatus = (id: number, status: string) => {
  const token = localStorage.getItem("token");

  axios
    .put(
      `http://127.0.0.1:8000/api/support-tickets/${id}`,
      { status }, // send new status
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      // update UI after success
      setTickets((prev) =>
        prev.map((t) =>
          t.ticket_id === id ? { ...t, status } : t
        )
      );
      alert(`✅ Ticket #${id} updated to ${status}`);
    })
    .catch((err) => {
      console.error("❌ Error updating status:", err.response?.data || err);
      alert("Failed to update ticket status");
    });
};

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className={styles.ticketsPage}>
        <h2>Support Tickets</h2>
        <table className={styles.ticketsTable}>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Student ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>#{ticket.ticket_id}</td>
                <td>{ticket.student_id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) => updateStatus(ticket.ticket_id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportTickets;
