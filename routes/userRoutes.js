import express from 'express'
import { set_account, connect_account} from '../controllers/userController.js'
const router = express.Router()

router.post('/register', set_account)
router.post('/connect', connect_account)

export default router