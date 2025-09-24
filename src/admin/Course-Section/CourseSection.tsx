import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import styles from "./CourseSection.module.css";

interface ScheduleItem {
day: string;
start_time: string;
end_time: string;
classroom: string;
}

interface CourseSectionForm {
course_id: number | "";
term_id: number | "";
faculty_id: number | "";
section_number: string;
content: string;
schedule: ScheduleItem[];
}

interface Course {
course_id: number;      // ✅ match your DB
course_name: string;
}

interface FacultyUser {
id: number;
name: string;
}

const AddCourseSection: React.FC = () => {
const navigate = useNavigate();
const token = localStorage.getItem("token");

const [formData, setFormData] = useState<CourseSectionForm>({
course_id: "",
term_id: "",
faculty_id: "",
section_number: "",
content: "",
schedule: [{ day: "", start_time: "", end_time: "", classroom: "" }],
});

const [courses, setCourses] = useState<Course[]>([]);
const [faculties, setFaculties] = useState<FacultyUser[]>([]);

// ✅ Fetch courses and faculties
useEffect(() => {
const headers = { Authorization: `Bearer ${token}` };

// Fetch Courses
axios
    .get("http://127.0.0.1:8000/api/courses", { headers })
    .then((res) =>
    setCourses(Array.isArray(res.data) ? res.data : res.data.data || [])
    )
    .catch((err) => console.error("❌ Error fetching courses:", err));

// Fetch Faculties
axios
    .get("http://127.0.0.1:8000/api/users/faculties", { headers })
    .then((res) =>
    setFaculties(Array.isArray(res.data) ? res.data : res.data.data || [])
    )
    .catch((err) => console.error("❌ Error fetching faculties:", err));
}, [token]);

// ✅ Handle input change
const handleChange = (
e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

// ✅ Handle schedule change
const handleScheduleChange = (
index: number,
e: React.ChangeEvent<HTMLInputElement>
) => {
const { name, value } = e.target;
const updatedSchedule = [...formData.schedule];
updatedSchedule[index][name as keyof ScheduleItem] = value;
setFormData((prev) => ({ ...prev, schedule: updatedSchedule }));
};

// ✅ Add new schedule row
const addScheduleRow = () => {
setFormData((prev) => ({
    ...prev,
    schedule: [
    ...prev.schedule,
    { day: "", start_time: "", end_time: "", classroom: "" },
    ],
}));
};

// ✅ Submit form
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
try {
    console.log("Submitting formData:", formData);
    await axios.post("http://127.0.0.1:8000/api/course-section-create", formData, {
    headers: { Authorization: `Bearer ${token}` },
    });
    alert("✅ Course section created successfully!");
    navigate("/courses");
} catch (error) {
    const err = error as AxiosError<{ error?: string }>;
    console.error(
    "❌ Error creating course section:",
    err.response?.data || err.message
    );
    alert("Failed to create course section");
}
};

return (
<div style={{ display: "flex" }}>
    <Sidebar />
    <div className={styles.page}>
    <h2>Add Course Section</h2>
    <form className={styles.form} onSubmit={handleSubmit}>
        {/* ✅ Course dropdown */}
        <select
        name="course_id"
        value={formData.course_id}
        onChange={handleChange}
        required
        >
        <option value="">Select Course</option>
        {courses.map((c) => (
            <option key={c.course_id} value={c.course_id}>
            {c.course_name}
            </option>
        ))}
        </select>

        {/* ✅ Term (manual input for now) */}
        <input
        type="number"
        name="term_id"
        placeholder="Enter Term ID"
        value={formData.term_id}
        onChange={handleChange}
        required
        />

        {/* ✅ Faculty dropdown */}
        {/* Faculty dropdown */}
<select
name="faculty_id"
value={formData.faculty_id}
onChange={handleChange}
required
>
<option value="">Select Faculty</option>
{faculties.map((f) => (
<option key={f.faculty.faculty_id} value={f.faculty.faculty_id}>
    {f.name} ({f.username})
</option>
))}
</select>


        <input
        type="text"
        name="section_number"
        placeholder="Section Number (e.g. IS101-A)"
        value={formData.section_number}
        onChange={handleChange}
        required
        />
        <textarea
        name="content"
        placeholder="Content/Description"
        value={formData.content}
        onChange={handleChange}
        required
        />

        {/* Schedule */}
        {/* Schedule */}
<h3>Schedule</h3>
{formData.schedule.map((row, index) => (
<div key={index} className={styles.scheduleRow}>
{/* ✅ Day dropdown instead of text input */}
<select
    name="day"
    value={row.day}
    onChange={(e) => handleScheduleChange(index, e as any)}
    required
>
    <option value="">Select Day</option>
    <option value="Sunday">Sunday</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
</select>

<input
    type="time"
    name="start_time"
    value={row.start_time}
    onChange={(e) => handleScheduleChange(index, e)}
    required
/>
<input
    type="time"
    name="end_time"
    value={row.end_time}
    onChange={(e) => handleScheduleChange(index, e)}
    required
/>
<input
    type="text"
    name="classroom"
    placeholder="Classroom"
    value={row.classroom}
    onChange={(e) => handleScheduleChange(index, e)}
    required
/>
</div>
))}
        <button
        type="button"
        className={styles.addRow}
        onClick={addScheduleRow}
        >
        + Add Schedule
        </button>

        <div className={styles.actions}>
        <button
            type="button"
            className={styles.cancel}
            
        >
            Cancel
        </button>
        <button type="submit" className={styles.save}>
            Save
        </button>
        </div>
    </form>
    </div>
</div>
);
};

export default AddCourseSection;
