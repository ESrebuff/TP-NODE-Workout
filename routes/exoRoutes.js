import express from 'express'
import { show_home, set_exo, show_exo } from '../controllers/exoController.js'
import { add_objectif } from '../controllers/obectifController.js'
const router = express.Router()

router.get('/', show_home)
router.post('/add-exo', set_exo)

router.get('/single/:id', show_exo)
router.post('/add-objectif/:id', add_objectif)

export default router
