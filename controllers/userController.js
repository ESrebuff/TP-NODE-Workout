import {WorkoutUser} from '../models/WorkoutUser.js'
import bcrypt from 'bcrypt'
// bcrypt recommanded
const saltRounds = 10;
const secret = '$2b$10$SZ438uYpkz1k2DvUN7U5I.XjcM4ESIke1iK/0OkOJ9X39MA3MatGS';

export const set_account = async(req, res) => {
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
}

export const connect_account = async(req, res) => {
    let user
    const userGetByMail = await WorkoutUser.findOne({
        pseudo: req.body.pseudo
    })
    const userGetByPseudo = await WorkoutUser.findOne({
        mail: req.body.pseudo
    })
    if(userGetByMail) {
        user = userGetByMail
    } else if(userGetByPseudo) {
        user = userGetByPseudo
    } else res.render('connect', { user : 'Votre compte ou mot de passe est invalide', session : checkAuth(req, res) })

    bcrypt.compare(req.body.pdw, user.password, function(err, result) {
        if(err) throw err
        else if(result) {
            if(!req.session.user) {
                req.session.user = user
            } 
            res.redirect('/')
        } else res.render('connect', { user : 'Votre compte ou mot de passe est invalide', session : checkAuth(req, res) })
    })
}

function checkAuth(req, res) {
    if(req.session.user) {
        return req.session.user
    }
    return false
}