import { Router } from 'express'
import {
  getEmployeeCardById,
  getEmployeeCards,
} from '../controllers/empcardcontroller.js'

const router = Router()

router.get('/', getEmployeeCards)
router.get('/:id', getEmployeeCardById)

export default router
