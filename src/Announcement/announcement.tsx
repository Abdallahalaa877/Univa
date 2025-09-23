import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./announcement.module.css";

const CreateAnnouncement: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // edit id if present
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [courseSectionId, setCourseSectionId] = useState("");

  // ✅ If editing, fetch existing data
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/announcement/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          setTitle(data.title || "");
          setContent(data.content || "");
          setCourseSectionId(data.course_section_id || "");
        })
        .catch((err) =>
          console.error("❌ Error fetching announcement:", err)
        );
    }
  }, [id, token]);

  // ✅ Handle submit (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        // Update
        await axios.put(
          `http://127.0.0.1:8000/api/announcement/update/${id}`,
          { title, content, course_section_id: courseSectionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("✅ Announcement updated!");
      } else {
        // Create
        await axios.post(
          "http://127.0.0.1:8000/api/announcement/create",
          { title, content, course_section_id: courseSectionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("✅ Announcement created!");
      }

      navigate("/admin");
    } catch (err) {
      console.error("❌ Error saving announcement:", err);
      alert("Failed to save announcement");
    }
  };

  return (
    <div className={styles.createAnnouncement}>
      <h2>{id ? "Edit Announcement" : "Create Announcement"}</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <select
          value={courseSectionId}
          onChange={(e) => setCourseSectionId(e.target.value)}
          required
        >
          <option value="">Select Course Section</option>
          <option value="10">Section 10</option>
          <option value="11">Section 11</option>
          <option value="12">Section 12</option>
        </select>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => navigate("/admin")}
          >
            Cancel
          </button>
          <button type="submit" className={styles.post}>
            {id ? "Update" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
