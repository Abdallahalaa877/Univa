import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>Univa</div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <Link
          to="/admin"
          className={`${styles.navItem} ${
            location.pathname === "/admin" ? styles.active : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className={`${styles.navItem} ${
            location.pathname === "/users" ? styles.active : ""
          }`}
        >
          Users
        </Link>
        <Link
          to="/coursesAdmin"
          className={`${styles.navItem} ${
            location.pathname === "/courses" ? styles.active : ""
          }`}
        >
          Courses
        </Link>
        <Link
          to="/grades"
          className={`${styles.navItem} ${
            location.pathname === "/grades" ? styles.active : ""
          }`}
        >
          Grades
        </Link>
        <Link
          to="/support"
          className={`${styles.navItem} ${
            location.pathname === "/support" ? styles.active : ""
          }`}
        >
          Support Tickets
        </Link>
       
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <Link
          to="/profile"
          className={`${styles.navItem} ${
            location.pathname === "/profile" ? styles.active : ""
          }`}
        >
          Profile
        </Link>
        <Link
          to="/logout"
          className={`${styles.navItem} ${
            location.pathname === "/logout" ? styles.active : ""
          }`}
        >
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
