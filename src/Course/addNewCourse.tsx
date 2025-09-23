import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import styles from "./addNewCourse.module.css";

interface CourseForm {
  course_code: string;
  course_name: string;
  description: string;
  credit_hours: number | "";
}

const AddOrEditCourse: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // 👈 detect if editing
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState<CourseForm>({
    course_code: "",
    course_name: "",
    description: "",
    credit_hours: "",
  });

  // ✅ Prefill form if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const course = res.data.data || res.data;
          setFormData({
            course_code: course.course_code,
            course_name: course.course_name,
            description: course.description,
            credit_hours: course.credit_hours,
          });
        })
        .catch((err) =>
          console.error("❌ Error fetching course:", err.response || err)
        );
    }
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "credit_hours" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // ✅ Update existing (Laravel expects POST, not PUT)
        await axios.post(
          `http://127.0.0.1:8000/api/course-update/${id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("✅ Course updated successfully!");
      } else {
        // ✅ Create new
        await axios.post("http://127.0.0.1:8000/api/course-create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Course created successfully!");
        // optional: clear form after create
        setFormData({
          course_code: "",
          course_name: "",
          description: "",
          credit_hours: "",
        });
      }

      // 👇 if you want to go back to list after save/update
    //   navigate("/courses");
      // ❌ if you want to stay on same page, comment the line above
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("❌ Error saving course:", err.response?.data || err.message);
      alert("Failed to save course");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className={styles.addCoursePage}>
        <h2>{id ? "Edit Course" : "Create New Course"}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="course_code"
            placeholder="Course Code (e.g. CS101)"
            value={formData.course_code}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course_name"
            placeholder="Course Title"
            value={formData.course_name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Course Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="credit_hours"
            placeholder="Credit Hours"
            value={formData.credit_hours}
            onChange={handleChange}
            required
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
            
            >
              Cancel
            </button>
            <button type="submit" className={styles.save}>
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditCourse;
