import { Router } from 'express'
import {
  getEmployeeCardById,
  getEmployeeCards,
  updateEmployeeCard,
} from '../controllers/empcardcontroller.js'

const router = Router()

router.get('/', getEmployeeCards)
router.get('/:id', getEmployeeCardById)
router.put('/:id', updateEmployeeCard)

export default router
