import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById, updateEmployee } from '../services/employeeServiceCard.js'
import './employee_Edit.css'

const fields = [
  { name: 'image', label: 'Image URL', type: 'text' },
  { name: 'employeeId', label: 'Employee ID', type: 'text' },
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'role', label: 'Role', type: 'text' },
  { name: 'department', label: 'Department', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'dateOfBirth', label: 'Date of birth', type: 'date' },
  { name: 'gender', label: 'Gender', type: 'text' },
  { name: 'address', label: 'Address', type: 'textarea' },
  { name: 'joiningDate', label: 'Joining date', type: 'date' },
  { name: 'manager', label: 'Manager', type: 'text' },
  { name: 'employmentStatus', label: 'Employment status', type: 'text' },
  { name: 'emergencyContactName', label: 'Emergency contact name', type: 'text' },
  {
    name: 'emergencyContactPhone',
    label: 'Emergency contact phone',
    type: 'tel',
  },
]

function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.message ||
    'Something went wrong. Please try again.'
  )
}

function EmployeeEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadEmployee() {
      try {
        const employee = await getEmployeeById(id)
        if (isCurrent) {
          setForm(
            Object.fromEntries(
              fields.map(({ name, type }) => [
                name,
                type === 'date'
                  ? employee[name]?.slice(0, 10) ?? ''
                  : employee[name] ?? '',
              ]),
            ),
          )
        }
      } catch (loadError) {
        if (isCurrent) {
          setError(getErrorMessage(loadError))
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

  function goToDetails() {
    navigate(`/employees/${id}`)
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      await updateEmployee(id, form)
      navigate(`/employees/${id}`)
    } catch (saveError) {
      setError(getErrorMessage(saveError))
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <main className="employee-edit-page">
        <p className="employee-edit-message" role="status">
          Loading employee details…
        </p>
      </main>
    )
  }

  if (!form) {
    return (
      <main className="employee-edit-page">
        <button
          className="employee-edit-back"
          type="button"
          onClick={goToDetails}
        >
          ← Back to employee
        </button>
        <p className="employee-edit-message" role="alert">
          Could not load employee: {error}
        </p>
      </main>
    )
  }

  return (
    <main className="employee-edit-page">
      <button
        className="employee-edit-back"
        type="button"
        onClick={goToDetails}
      >
        ← Back to employee
      </button>

      <section className="employee-edit-panel">
        <header className="employee-edit-header">
          <div>
            <p className="employee-edit-eyebrow">Employee directory</p>
            <h1>Edit employee</h1>
            <p>Update the employee information below.</p>
          </div>
          {form.image && (
            <img
              className="employee-edit-photo"
              src={form.image}
              alt={`${form.name || 'Employee'} profile`}
            />
          )}
        </header>

        <form className="employee-edit-form" onSubmit={handleSubmit}>
          <div className="employee-edit-grid">
            {fields.map(({ name, label, type }) => (
              <label
                className={`employee-edit-field${type === 'textarea' ? ' employee-edit-field--wide' : ''}`}
                key={name}
              >
                <span>{label}</span>
                {type === 'textarea' ? (
                  <textarea
                    name={name}
                    value={form[name]}
                    onChange={updateField}
                    rows={3}
                    required
                  />
                ) : (
                  <input
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={updateField}
                    required
                  />
                )}
              </label>
            ))}
          </div>

          {error && (
            <p className="employee-edit-error" role="alert">
              Could not save employee: {error}
            </p>
          )}

          <div className="employee-edit-actions">
            <button
              className="employee-edit-cancel"
              type="button"
              onClick={goToDetails}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="employee-edit-save"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default EmployeeEdit
