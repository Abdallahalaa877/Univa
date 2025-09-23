import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./user.module.css";
import Sidebar from "../sidebar/sidebar"; // ✅ import your Sidebar component
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  // ✅ Fetch users from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Error fetching users:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div className={styles.usersPage}>
          {/* Header */}
          <div className={styles.header}>
            <h2>Users</h2>
            <button className={styles.addUserBtn} onClick={()=>navigate("/addnew")}>Add new user</button>
          </div>

          {/* Search */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search users by id"
            />
            {/* <select>
              <option>Role</option>
            </select> */}
          </div>

          {/* Table */}
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noData}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
