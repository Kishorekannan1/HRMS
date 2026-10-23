import { Link } from 'react-router-dom'

function EmployeeCard({ employee }) {
  return (
    <article className="employee-card">
      <div className="employee-card__top">
        <img className="employee-photo" src={employee.image} alt={employee.name} />
        <span
          className={`employee-status employee-status--${employee.employmentStatus
            .toLowerCase()
            .replaceAll(' ', '-')}`}
        >
          <span className="employee-status__dot" />
          {employee.employmentStatus}
        </span>
      </div>
      <p className="employee-id">ID: {employee.employeeId}</p>
      <div className="employee-card__identity">
        <h2>{employee.name}</h2>
        <p>{employee.role}</p>
      </div>

      <div className="employee-card__details">
        <div>
          <span className="employee-detail__label">Department</span>
          <span className="employee-detail__value">{employee.department}</span>
        </div>
        <div>
          <span className="employee-detail__label">Location</span>
          <span className="employee-detail__value">{employee.location}</span>
        </div>
      </div>
      <Link className="employee-card__view" to={`/employees/${employee.id}`}>
        View
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default EmployeeCard
