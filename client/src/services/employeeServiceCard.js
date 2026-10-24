import axios from 'axios'

const employeeApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  //baseURL: import.meta.env.VITE_API_URL || '/api',
})

export async function getEmployees() {
  console.log('Fetching employees from API...');
  const { data } = await employeeApi.get('/employees')
  return data.map((employee) => ({
    ...employee,
    id: employee._id ?? employee.id,
  }))
}

export async function getEmployeeById(id) {
  const { data } = await employeeApi.get(`/employees/${encodeURIComponent(id)}`)
  return {
    ...data,
    id: data._id ?? data.id,
  }
}

export async function updateEmployee(id, employee) {
  const { data } = await employeeApi.put(
    `/employees/${encodeURIComponent(id)}`,
    employee,
  )
  return {
    ...data,
    id: data._id ?? data.id,
  }
}
