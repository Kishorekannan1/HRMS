import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import connectDB from './config/db.js'
import employeeRoutes from './routes/employees.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/employees', employeeRoutes)

async function startServer() {
  await connectDB()
  app.listen(port, () => {
    console.log(`Employee API listening on port ${port}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start the employee API:', error)
  process.exitCode = 1
})
