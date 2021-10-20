import express from 'express'
import bcrypt from 'bcrypt'
import {WorkoutUser} from '../models/WorkoutUser.js'

// bcrypt recommanded
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

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
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
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
                })
            })

        } else res.render('register', { user:'Votre email ou pseudo est déja utilisé' }) 
    } else res.render('register', { user:'Vos mot de passe doivent être identique' })
    } else res.render('register', { user:'Vous devez remplir entièrement le formulaire' })
})

export default router