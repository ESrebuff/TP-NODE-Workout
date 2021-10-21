import express from 'express'
import {WorkoutExos} from '../models/WorkoutExo.js'
const router = express.Router()
let view = 0;

router.get('/', async (req, res) => {
    const exos = await WorkoutExos.find()
    if(!req.session.view) {
        req.session.view = 1
    } else {
        req.session.view += 1
    }
    res.render('index', {exos : exos, myCount : req.session.view })
})

router.get('/form', (req, res) => {
    res.render('form')
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
            res.render('connect')
        })
    } else console.log("Existe déjà")
})
//Travailler dessus une fois la session fini avec l'affichage d'objectif actuel
router.get('/single/:id', async (req, res) => {
    const exo = await WorkoutExos.findById(req.params.id)
    res.render('single', { exo : exo })
})
// Faire l'envoie d'objectif

export default router