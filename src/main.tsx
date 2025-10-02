import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./Courses/Courses";
import CourseDetails from "./CourseDetails/CourseDetails";
import StudentProfile from "./StudentProfile/StudentProfile";
import SubmitRequest from "./SubmitRequest/SubmitRequest";
import Grades from "./admin/Grades/Grades";
import StudentGrades from "./Grades/Grades";
import Enrollment from "./Enrollment/Enrollment";
import SupportTicket from "./SupportTicket/supportTicket";
import Login from "./login/login";
import Home from"./Home/home";
import Schedule from "./Schedule/Schedule"
import "./index.css";
import AdminDashboard from "./admin/dashboard";
import Announcement from './admin/Announcement/announcement'
import Users from './admin/user/user'
import AddNewUser from './admin/user/addNewUser'
import CoursesForAdmin from './admin/Course/Courses'
import AddNewCourseForAdmin from './admin/Course/addNewCourse'
import AdminSupportTicket  from './admin/SupportTicket/SupportTicket'
import LogOut  from './logout/logout'
import CourseSection  from './admin/Course-Section/CourseSection'
import EnrollmentPage from "./Enrollment/Enrollment";

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
        <Route path="/studentGrades" element={<StudentGrades />} />

        <Route path="/enroll" element={<EnrollmentPage />} />
      
        <Route path="/support" element={<SupportTicket />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/announcement/edit/:id" element={<Announcement/>} />
        <Route path="/users" element={<Users/>} /> {/* ✅ Add Users route */}
        <Route path="/addnew" element={<AddNewUser/>} /> {/* ✅ Add Users route */}
        <Route path="/coursesAdmin" element={<CoursesForAdmin/>} /> {/* ✅ Add Users route */}
        <Route path="/addnewcourse" element={<AddNewCourseForAdmin/>} /> ✅ Add Users route
        <Route path="/courses/edit/:id" element={<AddNewCourseForAdmin/>} /> ✅ Add Users route
        <Route path="/SupportTicket" element={<SupportTicket/>} /> ✅ Add Users route
        <Route path="/Ticket" element={<AdminSupportTicket/>} /> ✅ Add Users route
        <Route path="/logout" element={<LogOut/>} /> ✅ Add Users route
        <Route path="/coursesection" element={<CourseSection/>} /> ✅ Add Users route


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
