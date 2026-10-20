import React from "react";

class StudentForm extends React.Component {
  state = {
    name: "",
    gpa: "",
    errors: {
      name: "",
      gpa: "",
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  validate = () => {
    const { name, gpa } = this.state;
    const errors = {
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
      errors.gpa = "GPA phải là số trong khoảng từ 0 đến 4.";
    }

    this.setState({ errors });
    return !errors.name && !errors.gpa;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }

    const { name, gpa } = this.state;
    this.props.onAddStudent({
      id: Date.now(),
      name: name.trim(),
      gpa: Number(gpa),
    });
    this.setState({
      name: "",
      gpa: "",
      errors: { name: "", gpa: "" },
    });
  };

  render() {
    const { name, gpa, errors } = this.state;

    return (
      <section className="panel form-panel">
        <div className="panel-heading">
          <div>
            <h2>Thêm sinh viên</h2>
          </div>
        </div>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="student-name">Name</label>
            <input
              id="student-name"
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
}

export default StudentForm;
