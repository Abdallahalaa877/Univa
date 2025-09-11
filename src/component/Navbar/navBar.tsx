import styles from "./navbar.module.css";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

    return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/univa.png" alt="Univa" />
        </div>

        {/* Links */}
        <nav className={styles.navLinks}>
          <a href="#" className={styles.active}>Home</a>
          <a href="#">Courses ▾</a>
          <a href="#">Grades</a>
          <a href="#">Support</a>
        </nav>

         {/* Avatar + Arrow */}
          <div className={styles.profile}>
            <img
              src="/avatar.png"
              alt="Profile"
              className={styles.avatar}
            />
            <button
              className={styles.arrowBtn}
              onClick={() => setOpen(!open)}
            >
              ▾
            </button>

            {/* Dropdown */}
            {open && (
              <div className={styles.dropdown}>
                <button className={styles.dropdownItem}>Logout</button>
              </div>
            )}
          </div>
        
      </div>
    </header>
  );

}
