/*
export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <>
    {}
    <Navbar onLoginClick={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    <section className={s.wrapper}>
      <div className={s.card}>
        <h1 className={s.title}>Welcome back</h1>

        <form className={s.form}>
          <label className={s.label}>Email or Username</label>
          <input className={s.input} type="text" placeholder="Enter your email or username" />

          <label className={s.label}>Password</label>
          <div className={s.pwRow}>
            <input
              className={s.input}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button type="button" className={s.eyeBtn} onClick={() => setShow(v => !v)} aria-label="Toggle password">
              {/* eye icon }*/
             /* <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {show ? (
                  <>
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 2 12 2 12a21.8 21.8 0 0 1 5.06-6.94" />
                    <path d="M1 1l22 22" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <div className={s.row}>
            <label><input type="checkbox" /> Remember me</label>
            <a className={s.link} href="#">Forgot password?</a>
          </div>

          <button className={s.btn} type="submit">Log in</button>
        </form>
      </div>
    </section>
    </>

  );
}
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../component/Navbarforlogin/navBar"

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // ✅ Correct hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Logging in with:", { email, password, remember });

    // ✅ Redirect to home page
    navigate("/home");
  };

  return (
    <>
    {}
    <Navbar/>
    
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome back</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email or Username</label>
            <input
              id="email"
              type="text"
              value={email}
              placeholder="Enter your email or username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <a href="/forgot-password" className={styles.forgot}>
              Forgot password?
            </a>
          </div>

          {/* Remember me */}
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Submit */}
          <button type="submit" className={styles.loginBtn}>
            Log in
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
