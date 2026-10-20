import { useState } from "react";
import Clock from "./components/Clock";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentSearch from "./components/StudentSearch";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Lưu Thanh Lâm", gpa: 3.4 },
    { id: 2, name: "Nguyễn Bình Minh", gpa: 3.4 },
    { id: 3, name: "Ngô Thế Dương", gpa: 3.6 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClock, setShowClock] = useState(true);

  const handleAddStudent = (student) => {
    setStudents((previousStudents) => [...previousStudents, student]);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== studentId),
    );
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(normalizedSearchTerm),
  );

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>Quản lý sinh viên</h1>
          <p className="subtitle">
            Trang quản lý dánh sách sinh viên và điểm GPA.
          </p>
        </div>
        <button
          className="secondary-button"
          type="button"
          onClick={() => setShowClock((previousShowClock) => !previousShowClock)}
        >
          {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </button>
      </header>

      {showClock && <Clock />}

      <section className="content-grid">
        <StudentForm onAddStudent={handleAddStudent} />
        <section className="panel list-panel">
          <div className="panel-heading">
            <div>
              <h2>Danh sách sinh viên</h2>
            </div>
            <span className="student-count">
              {filteredStudents.length} sinh viên
            </span>
          </div>
          <StudentSearch value={searchTerm} onSearchChange={setSearchTerm} />
          <StudentList
            students={filteredStudents}
            onDeleteStudent={handleDeleteStudent}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
