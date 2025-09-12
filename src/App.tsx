import { useState } from "react";
import Navbar from "./component/navBar/navbar";
import Home from "./Home/home";
import SupportTicket  from "./SupportTicket/supportTicket";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <><Navbar/>
    <SupportTicket/>
  </>
  );
}
