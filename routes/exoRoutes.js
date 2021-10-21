import express from 'express'
import { show_home, set_exo, show_exo } from '../controllers/exoController.js'
const router = express.Router()

router.get('/', show_home)
router.post('/add-exo', set_exo)
//Travailler dessus une fois la session fini avec l'affichage d'objectif actuel

router.get('/single/:id', show_exo)

// Faire l'envoie d'objectif
export default router