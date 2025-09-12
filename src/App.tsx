import { useState } from "react";
import Navbar from "./component/Navbar/navBar";
// import Home from "./Home/home";
// import Login from "./login/login";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    
     <Navbar/>
    
  );
}
