import { useState } from "react";
import styles from "./navbar.module.css";
import { FaBell } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";


const Navbar: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/univa.png" alt="Univa" />
        </div>

       {/* Links */}
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
        </li>

        {/* Dropdown */}
        <li className={styles.dropdown}>
          <span>
            Courses <span className={styles.arrow}>▼</span>
          </span>
          <ul className={styles.dropdownMenu}>
            <li>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/enroll"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Enroll in a course
              </NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink
            to="/studentGrades"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Grades
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Support
          </NavLink>
        </li>
      </ul>

      {/* Profile + Notifications */}
      <div className={styles.rightIcons}>
        <button className={styles.notificationBtn}>
          <FaBell size={18} />
        </button>

        {/* Profile dropdown */}
        <div
          className={styles.profileWrapper}
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img src="/profile.png" alt="Profile" className={styles.profilePic} />
          {profileOpen && (
            <ul className={styles.profileMenu}>
              <li>
                <NavLink to="/profile" className={styles.link}>
                  Profile
                </NavLink>
              </li>
              <li onClick={handleLogout} className={styles.link}>
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;