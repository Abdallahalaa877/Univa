import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import styles from "./Grades.module.css";

const UploadGrades: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a CSV file first.");
      return;
    }
    // TODO: send file to backend with FormData
    console.log("Uploading file:", file);
    alert("✅ File uploaded successfully!");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.uploadPage}>
        <h2>Upload Grades</h2>
        <p>
          Upload grades for the selected course. Ensure the file is in CSV
          format and contains the required fields.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.uploadBox}>
            <label
              htmlFor="fileUpload"
              className={styles.dropArea}
            >
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
            <button type="button" className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.upload}>
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadGrades;
