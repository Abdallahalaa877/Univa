import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Courses from "./Courses/Courses";
import CourseDetails from "./CourseDetails/CourseDetails";
import StudentProfile from "./StudentProfile/StudentProfile";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/courses" element={<Courses />} />
         <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/profile" element={<StudentProfile />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
