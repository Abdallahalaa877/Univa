import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/component/Navbar/navBar";
import Home from "./Home/home";
import Courses from "./Courses/Courses";
import Enroll from "./Enrollment/Enrollment";
import Grades from "./Grades/Grades";
import Support from "./SupportTicket/supportTicket";
import Profile from "./StudentProfile/StudentProfile";
import CourseDetails from "./CourseDetails/CourseDetails";
import StudentProfile from "./StudentProfile/StudentProfile";
import SubmitRequest from "./SubmitRequest/SubmitRequest";
const App: React.FC = () => {
  return (
     <>
    <Router>
      
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
           <Route path="/coursedetails" element={<CourseDetails />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
