import React, { useState } from "react";
import styles from "./StudentProfile.module.css";
import Navbar from "../component/Navbar/navBar";


const StudentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: "20250004",
    level: "Fourth Level",
    gpa: "3.06",
    program: "Information System",
    nationality: "مصري",
    nationalId: "30403152103834",
    completeHours: "90",
    status: "مقيد",
    address: "الجيزة",
    mobile: "01017134352",
    date: "15-3-2004",
    email: "AbdallahAlaa877@gmail.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isEditing) {
      console.log("Saved Profile:", profile);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
 {/* ✅ Navbar at the top */}
 <Navbar  />
    <div className={styles.container}>
        
        {}
      {Object.entries(profile).map(([key, value], idx) => (
        <div key={idx} className={styles.fieldGroup}>
          <label className={styles.label}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className={styles.value}
            readOnly={!isEditing}
          />
        </div>
      ))}

      <button className={styles.saveButton} onClick={handleSave}>
        <span className={styles.icon}>💾</span>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
    </>
  );
};

export default StudentProfile;
