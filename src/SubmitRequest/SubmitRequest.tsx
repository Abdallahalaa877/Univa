import React, { useState } from "react";
import axios from "axios";
import styles from "./SubmitRequest.module.css";
import Navbar from "../component/Navbar/navBar";

const SubmitRequest: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !category || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("priority", priority);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const token = localStorage.getItem("token"); // 👈 adjust if token is stored differently

      const res = await axios.post(
        "http://127.0.0.1:8000/api/support-tickets",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Request submitted successfully!");
      console.log(res.data);

      // reset form after successful submission
      setSubject("");
      setCategory("");
      setDescription("");
      setPriority("Low");
      setAttachment(null);

    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className={styles.container}>
        <h2 className={styles.title}>Submit a Request</h2>

        <form onSubmit={handleSubmit}>
          {/* Subject */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Subject</label>
            <input
              type="text"
              placeholder="Enter a subject"
              className={styles.input}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Academic">Academic</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              placeholder="Enter a description"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Attachment */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Attachment <span className={styles.attachmentNote}>(optional)</span>
            </label>
            <input
              type="file"
              className={styles.input}
              onChange={(e) =>
                setAttachment(e.target.files ? e.target.files[0] : null)
              }
            />
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
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SubmitRequest;
