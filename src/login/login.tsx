import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Navbar from "../component/Navbarforlogin/navBar";
import axios from "axios";
// import { AxiosError } from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 🔗 Send login request to backend
    const res = await axios.post("http://127.0.0.1:8000/api/login", {
      username:email,
      password,
    });

    // ✅ Save token + user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // ✅ Redirect by role
    if (res.data.user.name === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // This is an axios error
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid email or password");
    } else if (err instanceof Error) {
      // Some other error
      console.error("Unexpected error:", err.message);
      alert("Something went wrong");
    } else {
      console.error("Unknown error", err);
    }
  }
};


  return (
    <>
      <Navbar />
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
