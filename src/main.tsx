import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./Courses/Courses";
import CourseDetails from "./CourseDetails/CourseDetails";
import StudentProfile from "./StudentProfile/StudentProfile";
import SubmitRequest from "./SubmitRequest/SubmitRequest";
import Grades from "./Grades/Grades";
import Enrollment from "./Enrollment/Enrollment";
import SupportTicket from "./SupportTicket/supportTicket";
import Login from "./login/login";
import Home from"./Home/home";
import Schedule from "./Schedule/Schedule"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
     <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
         <Route path="/coursedetails" element={<CourseDetails />} />
        <Route path="/profile" element={<StudentProfile />} />
         <Route path="/SubmitRequest" element={<SubmitRequest />} />
         <Route path="/Grades" element={<Grades />} />
         <Route path="/enroll" element={<Enrollment />} />
          <Route path="/support" element={<SupportTicket />} />
          <Route path="/Schedule" element={<Schedule />} />



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
