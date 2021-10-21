import express from 'express'
import {WorkoutExos} from '../models/WorkoutExo.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const exos = await WorkoutExos.find()
    res.render('index', {exos : exos, session : checkAuth(req, res) })
})

router.get('/form', (req, res) => {
    const session = checkAuth(req, res)
    if(session.role) {
        res.render('form', { session : checkAuth(req, res) })
    } else res.redirect('/')
})

router.post('/add-exo', async (req, res) => {
    const getExoByName = await WorkoutExos.findOne({
        name: req.body.name
    })
    if(!getExoByName){
        const exo = new WorkoutExos({
            name: req.body.name
        }).save((err) => {
            if (err) {
                throw err;
            }
            console.log("Vous avez ajouter un exercice")
            res.redirect('/connect')
        })
    } else console.log("Existe déjà")
})
//Travailler dessus une fois la session fini avec l'affichage d'objectif actuel
router.get('/single/:id', async (req, res) => {
    const exo = await WorkoutExos.findById(req.params.id)
    if(checkAuth(req, res)) {
        res.render('single', { exo : exo, session : checkAuth(req, res) })
    } else {
        res.redirect('/')
    }
})
// Faire l'envoie d'objectif

function checkAuth(req, res) {
    if(req.session.user) {
        return req.session.user
    }
    return false
}

export default router