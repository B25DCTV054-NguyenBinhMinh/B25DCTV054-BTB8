import { useState } from "react";
import Clock from "./components/Clock";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentSearch from "./components/StudentSearch";
import { useTheme } from "./context/ThemeContext";
import useFetch from "./hooks/useFetch";

const STUDENTS_URL = "https://6ad794a195e98f36aef2a97f.mockapi.io/students";

function App() {
  const { data, loading, error, refetch } = useFetch(STUDENTS_URL);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClock, setShowClock] = useState(true);
  const [actionError, setActionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleAddStudent = async (student) => {
    setActionError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(STUDENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error(`Không thể thêm sinh viên (HTTP ${response.status}).`);
      }

      await refetch();
    } catch (requestError) {
      setActionError(
        requestError.message || "Đã xảy ra lỗi khi thêm sinh viên.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    setActionError(null);

    try {
      const response = await fetch(`${STUDENTS_URL}/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Không thể xóa sinh viên (HTTP ${response.status}).`);
      }

      await refetch();
    } catch (requestError) {
      setActionError(
        requestError.message || "Đã xảy ra lỗi khi xóa sinh viên.",
      );
    }
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const students = Array.isArray(data) ? data : [];
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(normalizedSearchTerm),
  );

  return (
    <div className={`app-container ${theme}`}>
      <main className="app-shell">
        <header className="app-header">
          <div>
            <h1>Quản lý sinh viên</h1>
            <p className="subtitle">
              Trang quản lý dánh sách sinh viên và điểm GPA.
            </p>
          </div>
          <div className="header-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={() => setShowClock((previousShowClock) => !previousShowClock)}
            >
              {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
            </button>
            <button className="secondary-button" type="button" onClick={toggleTheme}>
              {theme === "light"
                ? "Chuyển sang Chế độ Không sáng"
                : "Chuyển sang Chế độ Không tối"}
            </button>
          </div>
        </header>

        {showClock && <Clock />}

        <section className="content-grid">
          <StudentForm
            onAddStudent={handleAddStudent}
            isSubmitting={isSubmitting}
          />
          <section className="panel list-panel">
            <div className="panel-heading">
              <div>
                <h2>Danh sách sinh viên</h2>
              </div>
              {!loading && !error && (
                <span className="student-count">
                  {filteredStudents.length} sinh viên
                </span>
              )}
            </div>
            <StudentSearch value={searchTerm} onSearchChange={setSearchTerm} />
            {loading && (
              <p className="status-message">Đang tải danh sách sinh viên...</p>
            )}
            {error && <p className="error-message">{error}</p>}
            {actionError && <p className="error-message">{actionError}</p>}
            {!loading && !error && (
              <StudentList
                students={filteredStudents}
                onDeleteStudent={handleDeleteStudent}
              />
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
