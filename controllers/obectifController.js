import {
    WorkoutObjectif
}
from '../models/WorkoutObjectif.js'
export const add_objectif = async (req, res) => {
    const user = req.session.user
    if (user) {
        if (req.body.exoName || req.body.maxRep || req.body.obRep || req.body.maxWeigth || req.body.obWeigth) {
            const exoId = req.params.id
            const IdFromExoAndUser = user._id + exoId
            const getObjectif = await WorkoutObjectif.findOne({
                userAndExoId: IdFromExoAndUser
            })
            if(getObjectif) {
            const mdrrrr = WorkoutObjectif.findOneAndUpdate({userAndExoId : IdFromExoAndUser },
                 { 
                    countRepMax: req.body.maxRep,
                    countRepOb: req.body.obRep,
                    weightLiftingMax: req.body.maxWeigth,
                    weightLiftingOb: req.body.obWeigth
                }, (err, data) => {
                    if(err) {
                        throw err;
                    } else res.redirect('/')
                })
            } else {
            const objectif = new WorkoutObjectif({
                userAndExoId: IdFromExoAndUser,
                nameExos: req.body.exoName,
                pseudo: user.pseudo,
                mail: user.mail,
                roleUser: user.role,
                countRepMax: req.body.maxRep,
                countRepOb: req.body.obRep,
                weightLiftingMax: req.body.maxWeigth,
                weightLiftingOb: req.body.obWeigth
            }).save((err) => {
                if (err) {
                    throw err;
                }
                console.log("Vous avez ajouté un objectif")
                res.redirect('/')
            })
        }
        }
    } else res.redirect('/')
}