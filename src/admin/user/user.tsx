import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./user.module.css";
import Sidebar from "../sidebar/sidebar";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  username?: string; // optional if backend sends username
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchId, setSearchId] = useState<string>("");

  // ✅ Fetch users from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const usersData = Array.isArray(res.data) ? res.data : res.data.data;
        setUsers(usersData || []);
      })
      .catch((err) => console.error("❌ Error fetching users:", err));
  }, []);

  // ✅ Filter users by ID
  const filteredUsers = users.filter((user) =>
    searchId ? user.username.toString().includes(searchId) : true
  );
 const handleDelete = async (id: number) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `http://127.0.0.1:8000/api/delete-user/${id}`,
      {}, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setUsers((prev) => prev.filter((u) => u.id !== id));
    alert("✅ User deleted successfully!");
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    alert("Failed to delete user");
  }
};



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
            <button
              className={styles.addUserBtn}
              onClick={() => navigate("/addnew")}
            >
              Add new user
            </button>
          </div>

          {/* Search */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search users by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const role =user.name !== "admin" ? "student" : user.name;
                  return (
                    <tr key={user.id}>
                      <td>{user.username ?? user.id}</td>
                      <td>{user.name}</td>
                      <td>{role}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className={styles.deleteBtn} onClick={()=>handleDelete(user.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
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
