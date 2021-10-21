import express from 'express'
import { show_register, show_connect, disconnect_account, show_form_exo } from '../controllers/redirectController.js'
const router = express.Router()

router.get('/register', show_register)
router.get('/connect', show_connect)
router.get('/disconnect', disconnect_account)
router.get('/form', show_form_exo)

export default router