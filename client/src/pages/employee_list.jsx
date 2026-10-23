import { useEffect, useState } from 'react'
import EmployeeCard from '../components/EmployeeCard.jsx'
import { getEmployees } from '../services/employeeServiceCard.js'

function EmployeeList() {
  const [search, setSearch] = useState('')
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadEmployees() {
      try {
        const data = await getEmployees()
        if (isCurrent) {
          setEmployees(data)
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(
            loadError.response?.data?.message ||
              loadError.message ||
              'Unable to load employees.',
          )
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadEmployees()
    return () => {
      isCurrent = false
    }
  }, [])

  const filteredEmployees = employees.filter((employee) =>
    `${employee.employeeId} ${employee.name} ${employee.role} ${employee.department} ${employee.location} ${employee.employmentStatus}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  )

  return (
    <main className="employee-page">
      <header className="employee-page__header">
        <div>
          <p className="employee-page__eyebrow">People</p>
          <h1>Employee directory</h1>
          <p className="employee-page__description">
            Browse your team and find the right person.
          </p>
        </div>
        <label className="employee-search">
          <span className="employee-search__icon" aria-hidden="true">
            ⌕
          </span>
          <span className="visually-hidden">Search employees</span>
          <input
            type="search"
            placeholder="Search employees"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header>

      <section className="employee-directory" aria-label="Employees">
        <div className="employee-directory__heading">
          <h2>Team members</h2>
          <span>{filteredEmployees.length} employees</span>
        </div>
        {isLoading ? (
          <p className="employee-empty-state" role="status">
            Loading employees…
          </p>
        ) : error ? (
          <p className="employee-empty-state" role="alert">
            Could not load employees: {error}
          </p>
        ) : filteredEmployees.length > 0 ? (
          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        ) : (
          <p className="employee-empty-state">
            No employees match “{search}”. Try another name or department.
          </p>
        )}
      </section>
    </main>
  )
}

export default EmployeeList