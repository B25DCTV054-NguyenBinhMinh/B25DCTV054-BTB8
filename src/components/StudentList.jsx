function StudentList({ students, onDeleteStudent }) {
  const handleDelete = (student) => {
    const shouldDelete = window.confirm(
      `Hành động này sẽ xóa sinh viên ${student.name}. Chắc chưa ku?`,
    );

    if (shouldDelete) {
      onDeleteStudent(student.id);
    }
  };

  if (students.length === 0) {
    return <p className="empty-state">Không tìm thấy sinh viên phù hợp.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Tên sinh viên</th>
            <th>GPA</th>
            <th aria-label="Thao tác" />
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <span className="gpa-badge">{student.gpa.toFixed(2)}</span>
              </td>
              <td className="action-cell">
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => handleDelete(student)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
