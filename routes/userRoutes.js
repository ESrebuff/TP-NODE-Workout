import express from 'express'
import bcrypt from 'bcrypt'
import {WorkoutUser} from '../models/WorkoutUser.js'

// bcrypt recommanded
const saltRounds = 10;
const secret = '$2b$10$SZ438uYpkz1k2DvUN7U5I.XjcM4ESIke1iK/0OkOJ9X39MA3MatGS';

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('register', { user:false })
})

router.post('/register', async(req, res) => {
    if (req.body.pseudo && req.body.mail && req.body.pdw && req.body.pdwv) {
        if(req.body.pdw === req.body.pdwv) {
        const getUserByPseudo = await WorkoutUser.findOne({
            pseudo: req.body.pseudo
        })
        const getUserByMail = await WorkoutUser.findOne({
            mail: req.body.mail
        })
        if (!getUserByPseudo && !getUserByMail) {
                    const hash = bcrypt.hashSync(req.body.pdw, saltRounds)
                    const newUser = new WorkoutUser({
                        pseudo: req.body.pseudo,
                        mail: req.body.mail,
                        password: hash
                    }).save((err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Vous avez réussi à vous enregistrer")
                        res.render('connect')
                    })

        } else res.render('register', { user:'Votre email ou pseudo est déja utilisé' }) 
    } else res.render('register', { user:'Vos mot de passe doivent être identique' })
    } else res.render('register', { user:'Vous devez remplir entièrement le formulaire' })
})

router.get('/connect', (req, res) => {
    res.render('connect')
})

router.get('/connect/admin', (req, res) => {
    res.render('connect-admin')
})

export default router