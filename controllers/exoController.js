import {WorkoutExos} from '../models/WorkoutExo.js'
import {WorkoutObjectif} from '../models/WorkoutObjectif.js'

export const show_home = async (req, res) => {
    const exos = await WorkoutExos.find()
    res.render('index', {
        exos: exos,
        session: checkAuth(req, res)
    })
}

export const set_exo = async (req, res) => {
    const admin = checkAuth(req, res)
    if (admin.role) {
        const getExoByName = await WorkoutExos.findOne({
            name: req.body.name
        })
        if (!getExoByName) {
            const exo = new WorkoutExos({
                name: req.body.name
            }).save((err) => {
                if (err) {
                    throw err;
                }
                console.log("Vous avez ajouté un exercice")
                res.redirect('/connect')
            })
        } else console.log("Existe déjà")
    } else res.redirect('/')
}


/*
const user = req.session.user
const exoId = req.params.id
const IdFromExoAndUser = user._id + exoId
*/


export const show_exo = async (req, res) => {
    if (checkAuth(req, res)) {
        const exo = await WorkoutExos.findById(req.params.id)
        if (exo) {
            const IdFromExoAndUser = req.session.user._id + exo.id
            const objectif = await WorkoutObjectif.findOne({
                userAndExoId: IdFromExoAndUser
            })
            const objectifExist = objectif => {
                if(objectif) {
                    return objectif
                } else return false
            }
            
            res.render('single', { exo: exo, session: checkAuth(req, res), objectif : objectifExist(objectif) })
        }
    } else res.redirect('/')
}

function checkAuth(req, res) {
    if (req.session.user) {
        return req.session.user
    }
    return false
}