// import styles from "./Grades.module.css";
// // import Navbar from "../../component/Navbar/navBar";
// import React, { useState } from "react";

// type Grade = {
//   code: string;
//   name: string;
//   credits: number;
//   instructor: string;
//   midterm: number;
//   final: number;
//   assignments: number;
//   total: number;
//   status: "Pass" | "Fail";
//   term: string; // <-- add term info
// };

// const gradesData: Grade[] = [
//   {
//     code: "CS101",
//     name: "Introduction to Computer Science",
//     credits: 3,
//     instructor: "Dr. Eleanor Harper",
//     midterm: 85,
//     final: 90,
//     assignments: 92,
//     total: 89,
//     status: "Pass",
//     term: "Spring 2025",
//   },
//   {
//     code: "MA102",
//     name: "Calculus I",
//     credits: 4,
//     instructor: "Prof. Samuel Bennett",
//     midterm: 78,
//     final: 82,
//     assignments: 80,
//     total: 80,
//     status: "Pass",
//     term: "Spring 2025",
//   },
//   {
//     code: "PH101",
//     name: "Physics I",
//     credits: 4,
//     instructor: "Dr. Olivia Carter",
//     midterm: 65,
//     final: 70,
//     assignments: 68,
//     total: 68,
//     status: "Pass",
//     term: "Spring 2025",
//   },
//   {
//     code: "EN101",
//     name: "English Composition",
//     credits: 3,
//     instructor: "Prof. Amelia Hayes",
//     midterm: 92,
//     final: 95,
//     assignments: 94,
//     total: 94,
//     status: "Pass",
//     term: "Fall 2024",
//   },
//   {
//     code: "CH101",
//     name: "Chemistry I",
//     credits: 4,
//     instructor: "Dr. Ethan Foster",
//     midterm: 55,
//     final: 58,
//     assignments: 56,
//     total: 56,
//     status: "Fail",
//     term: "Spring 2024",
//   },
// ];

// type Summary = {
//   gpa: number;
//   completed: number;
//   inProgress: number;
// };

// const summary: Summary = {
//   gpa: 3.2,
//   completed: 14,
//   inProgress: 16,
// };

// function exportToCSV(data: Grade[]) {
//   const headers = [
//     "Course Code",
//     "Course Name",
//     "Credits",
//     "Instructor",
//     "Midterm",
//     "Final",
//     "Assignments",
//     "Total Grade",
//     "Status",
//     "Term",
//   ];

//   const rows = data.map((g) => [
//     g.code,
//     g.name,
//     g.credits,
//     g.instructor,
//     g.midterm,
//     g.final,
//     g.assignments,
//     g.total,
//     g.status,
//     g.term,
//   ]);

//   const csvContent =
//     [headers, ...rows]
//       .map((row) => row.join(","))
//       .join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "grades.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// export default function GradesPage() {
//   const [selectedTerm, setSelectedTerm] = useState("Spring 2025");

//   const terms = Array.from(new Set(gradesData.map((g) => g.term)));

//   const filteredGrades = gradesData.filter(
//     (g) => g.term === selectedTerm
//   );

//   return (
//     <>
//       {/* ✅ Navbar at the top */}
//               <Navbar />
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>My Grades</h1>
//         <button
//           className={styles.exportBtn}
//           onClick={() => exportToCSV(filteredGrades)}
//         >
//           Export
//         </button>
//       </div>

//       <select
//         className={styles.select}
//         value={selectedTerm}
//         onChange={(e) => setSelectedTerm(e.target.value)}
//       >
//         {terms.map((term) => (
//           <option key={term} value={term}>
//             {term}
//           </option>
//         ))}
//       </select>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Course Code</th>
//             <th>Course Name</th>
//             <th>Credits</th>
//             <th>Instructor</th>
//             <th>Midterm</th>
//             <th>Final</th>
//             <th>Assignments</th>
//             <th>Total Grade</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredGrades.map((course) => (
//             <tr key={course.code}>
//               <td>{course.code}</td>
//               <td>{course.name}</td>
//               <td>{course.credits}</td>
//               <td>{course.instructor}</td>
//               <td>{course.midterm}</td>
//               <td>{course.final}</td>
//               <td>{course.assignments}</td>
//               <td>{course.total}</td>
//               <td>
//                 <span
//                   className={
//                     course.status === "Pass"
//                       ? styles.pass
//                       : styles.fail
//                   }
//                 >
//                   {course.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className={styles.summary}>
//         <div className={styles.card}>
//           <p>GPA</p>
//           <h3>{summary.gpa}</h3>
//         </div>
//         <div className={styles.card}>
//           <p>Total Credits Completed</p>
//           <h3>{summary.completed}</h3>
//         </div>
//         <div className={styles.card}>
//           <p>Credits in Progress</p>
//           <h3>{summary.inProgress}</h3>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }
