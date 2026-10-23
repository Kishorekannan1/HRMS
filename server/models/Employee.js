import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    joiningDate: { type: String, required: true },
    manager: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.model('Employee', employeeSchema, 'emp_details')
