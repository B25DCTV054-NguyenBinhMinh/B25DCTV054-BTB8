import React from 'react'

class StudentSearch extends React.Component {
  handleChange = (event) => {
    this.props.onSearchChange(event.target.value)
  }

  render() {
    const { value } = this.props

    return (
      <div className="search-field">
        <label htmlFor="student-search">Tìm theo tên</label>
        <input
          id="student-search"
          type="search"
          value={value}
          onChange={this.handleChange}
          placeholder="Nhập tên cần tìm..."
        />
      </div>
    )
  }
}

export default StudentSearch
