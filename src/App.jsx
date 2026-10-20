import React from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentSearch from "./components/StudentSearch";

class App extends React.Component {
  state = {
    students: [
      { id: 1, name: "Lưu Thanh Lâm", gpa: 3.4 },
      { id: 2, name: "Nguyễn Bình Minh", gpa: 3.4 },
      { id: 3, name: "Ngô Thế Dương", gpa: 3.6 },
    ],
    searchTerm: "",
  };

  handleAddStudent = (student) => {
    this.setState((prevState) => ({
      students: [...prevState.students, student],
    }));
  };

  handleDeleteStudent = (studentId) => {
    this.setState((prevState) => ({
      students: prevState.students.filter(
        (student) => student.id !== studentId,
      ),
    }));
  };

  handleSearchChange = (searchTerm) => {
    this.setState({ searchTerm });
  };

  render() {
    const { students, searchTerm } = this.state;
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
        </header>

        <section className="content-grid">
          <StudentForm onAddStudent={this.handleAddStudent} />
          <section className="panel list-panel">
            <div className="panel-heading">
              <div>
                <h2>Danh sách sinh viên</h2>
              </div>
              <span className="student-count">
                {filteredStudents.length} sinh viên
              </span>
            </div>
            <StudentSearch
              value={searchTerm}
              onSearchChange={this.handleSearchChange}
            />
            <StudentList
              students={filteredStudents}
              onDeleteStudent={this.handleDeleteStudent}
            />
          </section>
        </section>
      </main>
    );
  }
}

export default App;
