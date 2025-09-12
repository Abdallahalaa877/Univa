import { useState } from "react";
import Navbar from "./component/Navbar/navBar";
import SupportTicket  from "./SupportTicket/supportTicket";
import Courses from "./Courses/Courses";
import CourseDetails from "./CourseDetails/CourseDetails";
import StudentProfile from "./StudentProfile/StudentProfile";
import SubmitRequest from "./SubmitRequest/SubmitRequest";
import Grades from "./Grades/Grades";
import Enrollment from "./Enrollment/Enrollment";
import Login from "./login/login";
import Home from"./Home/home";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <><Navbar/>
     <Home/>
    <SupportTicket/>
    <CourseDetails/>
    <Courses/>
    <StudentProfile/>
    <Grades/>
    <Home/>
  </>
  );
}
