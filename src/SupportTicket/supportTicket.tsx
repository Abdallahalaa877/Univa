import React, { useState } from "react";
import style from "./supportTicket.module.css";

export default function App() {
  const today = new Date().toISOString().split("T")[0];

  const [tickets, setTickets] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [nextId, setNextId] = useState(1);

  // إضافة تذكرة جديدة
  const addTicket = () => {
    if (newSubject.trim()) {
      const newTicket = {
        id: nextId,
        subject: newSubject,
        status: "In Progress",
        dateSubmitted: today,
        contactPhone: newPhone,
        phoneLocked: newPhone.trim() !== ""
      };

      setTickets((prev) => {
        const updated = [...prev, newTicket].filter(
          (t) => t.dateSubmitted === today
        );
        return updated;
      });

      setNextId(nextId + 1);
      setNewSubject("");
      setNewPhone("");
    }
  };

  // تغيير الحالة إلى Resolved
  const markResolved = (id) => {
    setTickets(
      tickets.map((t) =>
        t.id === id ? { ...t, status: "Resolved" } : t
      )
    );
  };

  // تحديث رقم التليفون (بس لو مش مقفول)
  const updatePhone = (id, phone) => {
    setTickets(
      tickets.map((t) =>
        t.id === id && !t.phoneLocked
          ? { ...t, contactPhone: phone }
          : t
      )
    );
  };

  return (
    <div className={style["tickets-container"]}>
      <h2>Support Tickets</h2>

      {/* إضافة تذكرة جديدة */}
      <div className={style["new-ticket"]}>
        <input
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter subject..."
        />
        <input
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Enter number or Email"
        />
        <button onClick={addTicket}>Add Ticket</button>
      </div>

      {/* جدول التذاكر */}
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date Submitted</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>#{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>
                <span
                  className={
                    ticket.status === "Resolved"
                      ? style.Resolved
                      : style["InProgress"]
                  }
                >
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.dateSubmitted}</td>
              <td>
                <input
                  value={ticket.contactPhone}
                  onChange={(e) => updatePhone(ticket.id, e.target.value)}
                  placeholder="Enter phone..."
                  disabled={ticket.phoneLocked}
                />
              </td>
              <td>
                <button
                  onClick={() => markResolved(ticket.id)}
                  disabled={ticket.status === "Resolved"}
                >
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
