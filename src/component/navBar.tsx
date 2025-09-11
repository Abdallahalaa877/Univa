import styles from "./Navbar.module.css";
import logo from "/public/univa.png"; // حط صورة اللوجو في public أو src

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Left: Logo */}
        <div className={styles.logo}>
          <img src={logo} alt="Univa" />
        </div>

        {/* Center: Links */}
        <nav className={styles.navLinks}>
          <a href="#" className={styles.active}>Home</a>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Downloads ▾</button>
            <div className={styles.dropdownContent}>
              <a href="#">Windows Client</a>
              <a href="#">macOS Client</a>
              <a href="#">Android / iOS</a>
            </div>
          </div>
          <a href="#">Support</a>
        </nav>

        {/* Right: Login Button */}
        <a href="#" className={styles.loginBtn}>Login</a>
      </div>
    </header>
  );
}
