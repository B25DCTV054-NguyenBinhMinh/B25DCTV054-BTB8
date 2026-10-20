function StudentSearch({ value, onSearchChange }) {
  return (
    <div className="search-field">
      <label htmlFor="student-search">Tìm theo tên</label>
      <input
        id="student-search"
        type="search"
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Nhập tên cần tìm..."
      />
    </div>
  );
}

export default StudentSearch;
