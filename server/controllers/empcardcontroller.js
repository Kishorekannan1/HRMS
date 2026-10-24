import mongoose from 'mongoose'
import Employee from '../models/Employee.js'

export async function getEmployeeCards(request, response) {
  const employees = await Employee.find().sort({ name: 1 }).lean()
  return response.json(employees)
}

export async function getEmployeeCardById(request, response) {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ message: 'Invalid employee ID.' })
  }

  const employee = await Employee.findById(request.params.id).lean()
  if (!employee) {
    return response.status(404).json({ message: 'Employee not found.' })
  }

  return response.json(employee)
}

export async function updateEmployeeCard(request, response) {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ message: 'Invalid employee ID.' })
  }

  const editableFields = [
    'employeeId',
    'name',
    'role',
    'department',
    'location',
    'image',
    'employmentStatus',
    'email',
    'phone',
    'dateOfBirth',
    'gender',
    'address',
    'joiningDate',
    'manager',
    'emergencyContactName',
    'emergencyContactPhone',
  ]
  const updates = Object.fromEntries(
    editableFields
      .filter((field) => Object.hasOwn(request.body, field))
      .map((field) => [field, request.body[field]]),
  )

  const employee = await Employee.findByIdAndUpdate(request.params.id, updates, {
    new: true,
    runValidators: true,
  }).lean()

  if (!employee) {
    return response.status(404).json({ message: 'Employee not found.' })
  }

  return response.json(employee)
}
