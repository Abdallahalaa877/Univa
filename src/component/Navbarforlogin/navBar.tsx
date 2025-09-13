import React from "react";
import styles from "./navBar.module.css";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  onLoginClick?: () => void; // optional prop
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
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
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
        </li>

        {/* Downloads Dropdown */}
        <li className={styles.dropdown}>
          <span className={styles.link}>
            Downloads <span className={styles.arrow}>▼</span>
          </span>
          <ul className={styles.dropdownMenu}>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Course Catalog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bylaw"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Bylaw
              </NavLink>
            </li>
          </ul>
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

      {/* Login Button */}
      <button className={styles.loginBtn} onClick={onLoginClick}>
        Login
      </button>
    </nav>
  );
};

export default Navbar;
