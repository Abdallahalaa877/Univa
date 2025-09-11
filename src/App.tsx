import { useState } from "react";
import Navbar from "./component/Navbar/navBar";
import Home from "./Home/home";
import Login from "./login/login";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      
      {/* الصفحة الرئيسية */}
      <Home />

      {/* لو ضغط Login يظهر Tab */}
      {showLogin && (
        <div style={{
          position: "fixed",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "400px"
        }}>
          <button 
            style={{
              float: "right",
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer"
            }}
            onClick={() => setShowLogin(false)}
          >
            ✖
          </button>
          <Login />
        </div>
      )}
    </>
  );
}
