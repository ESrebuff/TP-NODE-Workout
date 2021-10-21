import mongoose from 'mongoose'

const workoutObjectifSchema = new mongoose.Schema({
    userAndExoId: String,
    nameExos: String,
    pseudo: String,
    mail: String,
    roleUser: { type: Boolean, default: false },
    countRepMax: { type: Number, default: 0 },
    countRepOb: { type: Number, default: 0 },
    weightLiftingMax: { type: Number, default: 0 },
    weightLiftingOb: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
})

export const WorkoutObjectif = mongoose.model('WorkoutObjectif', workoutObjectifSchema)



// maxWeigth
// maxRep
// obWeigth
// obRep