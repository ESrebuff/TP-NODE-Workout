import {WorkoutExos} from '../models/WorkoutExo.js'

export const show_home = async (req, res) => {
    const exos = await WorkoutExos.find()
    res.render('index', {exos : exos, session : checkAuth(req, res) })
}

export const set_exo = async(req, res) => {
    const admin = checkAuth(req, res)
    if(admin.role) {
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
    } else res.redirect('/')
}

export const show_exo = async(req, res) => {
    const exo = await WorkoutExos.findById(req.params.id)
    if(checkAuth(req, res)) {
        res.render('single', { exo : exo, session : checkAuth(req, res) })
    } else res.redirect('/')
}

function checkAuth(req, res) {
    if(req.session.user) {
        return req.session.user
    }
    return false
}