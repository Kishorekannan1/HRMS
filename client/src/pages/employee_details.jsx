import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById } from '../services/employeeServiceCard.js'

function EmployeeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    let isCurrent = true

    async function loadEmployee() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getEmployeeById(id)
        if (isCurrent) {
          setEmployee(data)
          setIsEnabled(data.enabled ?? true)
        }
      } catch (loadError) {
        if (isCurrent) {
          setEmployee(null)
          setError(
            loadError.response?.data?.message ||
              loadError.message ||
              'Unable to load employee.',
          )
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadEmployee()
    return () => {
      isCurrent = false
    }
  }, [id])

  const goBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
      return
    }

    navigate('/', { replace: true })
  }

  if (isLoading) {
    return (
      <main className="employee-page">
        <button className="employee-back-link" type="button" onClick={goBack}>
          ← Back
        </button>
        <p className="employee-empty-state" role="status">Loading employee…</p>
      </main>
    )
  }

  if (!employee || error) {
    return (
      <main className="employee-page">
        <button className="employee-back-link" type="button" onClick={goBack}>
          ← Back
        </button>
        <p className="employee-empty-state" role="alert">
          {error ? `Could not load employee: ${error}` : 'Employee not found.'}
        </p>
      </main>
    )
  }

  return (
    <main className="employee-page">
      <button className="employee-back-link" type="button" onClick={goBack}>
        ← Back
      </button>

      <section className="employee-profile" aria-label={`${employee.name} details`}>
        <div className="employee-profile__header">
          <img className="employee-photo" src={employee.image} alt={employee.name} />
          <div className="employee-profile__identity">
            <p className="employee-id">ID: {employee.employeeId}</p>
            <h1>{employee.name}</h1>
            <p className="employee-page__description">{employee.role}</p>
          </div>
          <span
            className={`employee-status employee-status--${employee.employmentStatus
              .toLowerCase()
              .replaceAll(' ', '-')}`}
          >
            <span className="employee-status__dot" />
            {employee.employmentStatus}
          </span>
          <button
            className={`employee-toggle${isEnabled ? '' : ' employee-toggle--disabled'}`}
            type="button"
            aria-pressed={isEnabled}
            onClick={() => setIsEnabled((enabled) => !enabled)}
          >
            {isEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>

        <dl className="employee-profile__details">
          <div>
            <dt>Role</dt>
            <dd>{employee.role}</dd>
          </div>
          <div>
            <dt>Employee ID</dt>
            <dd>{employee.employeeId}</dd>
          </div>
          <div>
            <dt>Department</dt>
            <dd>{employee.department}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{employee.location}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a href={`mailto:${employee.email}`}>{employee.email}</a></dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd><a href={`tel:${employee.phone}`}>{employee.phone}</a></dd>
          </div>
          <div>
            <dt>Date of birth</dt>
            <dd>{employee.dateOfBirth}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{employee.gender}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{employee.address}</dd>
          </div>
          <div>
            <dt>Joining date</dt>
            <dd>{employee.joiningDate}</dd>
          </div>
          <div>
            <dt>Manager</dt>
            <dd>{employee.manager}</dd>
          </div>
          <div>
            <dt>Employment status</dt>
            <dd>{employee.employmentStatus}</dd>
          </div>
          <div>
            <dt>Emergency contact name</dt>
            <dd>{employee.emergencyContactName}</dd>
          </div>
          <div>
            <dt>Emergency contact phone</dt>
            <dd><a href={`tel:${employee.emergencyContactPhone}`}>{employee.emergencyContactPhone}</a></dd>
          </div>
        </dl>
      </section>
    </main>
  )
}

export default EmployeeDetails
