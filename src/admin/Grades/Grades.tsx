import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";
import styles from "./Grades.module.css";

const UploadGrades: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: make this dynamic, for now hardcoded example
  const courseSectionId = 1; // replace with real sectionId
  // const assignmentId = 5; // if uploading assignment grades as faculty

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("⚠️ Please upload a CSV file first.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      // 🔹 Admin endpoint for course grades
      const res = await axios.post(
        `http://127.0.0.1:8000/api/course/grades/${courseSectionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Upload success:", res.data);
      alert("✅ Grades uploaded successfully!");
    } catch (err: any) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      alert("❌ Failed to upload grades. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.uploadPage}>
        <h2>Upload Grades</h2>
        <p>
          Upload grades for the selected course. Ensure the file is in{" "}
          <b>CSV format</b> and contains the required fields.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.uploadBox}>
            <label htmlFor="fileUpload" className={styles.dropArea}>
              {file ? (
                <span>{file.name}</span>
              ) : (
                <span>Drag and drop CSV file here or click to browse</span>
              )}
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setFile(null)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className={styles.upload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadGrades;
