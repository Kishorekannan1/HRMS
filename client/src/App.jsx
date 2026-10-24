import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeList from './pages/employee_list.jsx'
import EmployeeDetails from './pages/employee_details.jsx'
import EmployeeEdit from './pages/employee_Edit.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/:id/edit" element={<EmployeeEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
