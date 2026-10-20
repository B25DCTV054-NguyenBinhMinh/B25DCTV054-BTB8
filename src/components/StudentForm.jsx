import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [gpa, setGpa] = useState("");
  const [errors, setErrors] = useState({ name: "", gpa: "" });

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((previousErrors) => ({ ...previousErrors, name: "" }));
  };

  const handleGpaChange = (event) => {
    setGpa(event.target.value);
    setErrors((previousErrors) => ({ ...previousErrors, gpa: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {
      name: name.trim() ? "" : "Vui lòng nhập tên sinh viên.",
      gpa: "",
    };
    const numericGpa = Number(gpa);

    if (
      gpa === "" ||
      Number.isNaN(numericGpa) ||
      numericGpa < 0 ||
      numericGpa > 4
    ) {
      nextErrors.gpa = "GPA phải là số trong khoảng từ 0 đến 4.";
    }

    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.gpa) {
      return;
    }

    onAddStudent({
      id: Date.now(),
      name: name.trim(),
      gpa: numericGpa,
    });
    setName("");
    setGpa("");
    setErrors({ name: "", gpa: "" });
  };

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <h2>Thêm sinh viên</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="student-name">Name</label>
          <input
            id="student-name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Nhập tên sinh viên"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p className="error-message" id="name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="student-gpa">GPA</label>
          <input
            id="student-gpa"
            name="gpa"
            type="number"
            min="0"
            max="4"
            step="0.01"
            value={gpa}
            onChange={handleGpaChange}
            placeholder="0.00 - 4.00"
            aria-invalid={Boolean(errors.gpa)}
            aria-describedby={errors.gpa ? "gpa-error" : undefined}
          />
          {errors.gpa && (
            <p className="error-message" id="gpa-error">
              {errors.gpa}
            </p>
          )}
        </div>
        <button className="primary-button full-width" type="submit">
          Thêm sinh viên
        </button>
      </form>
    </section>
  );
}

export default StudentForm;
