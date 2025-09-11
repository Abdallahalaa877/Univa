import styles from "./Navbar.module.css";

interface NavbarProps {
  onLoginClick: () => void; // نستقبل الـ prop من App.tsx
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <div className={styles.container}>
  <div className={styles.logo}>
    <img src="/univa.png" alt="Univa" />
  </div>

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

  <div className={styles.actions}>
    <button className={styles.loginBtn} onClick={onLoginClick}>
      Login
    </button>
  </div>
</div>
  )
}
