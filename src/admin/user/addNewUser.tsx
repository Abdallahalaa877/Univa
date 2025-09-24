import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./addNewUser.module.css";
import SideBar from "../sidebar/sidebar"; // ✅ Use your sidebar component

interface UserForm {
  name: string;
  email: string;
  role: "admin" | "student" | "faculty" | "";
  department: string;
  password: string;
  password_confirmation: string;
}

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState<UserForm>({
    name: "",
    email: "",
    role: "",
    department: "",
    password: "",
    password_confirmation: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/users", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ User created successfully!");
      navigate("/users");
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("❌ Error creating user:", err.response?.data || err.message);
      alert("Failed to create user");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* ✅ Sidebar on left */}
      <SideBar />

      {/* ✅ Add User Form */}
      <div className={styles.addUserPage}>
        <h2>Add New User</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>
            <button type="submit" className={styles.save}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
