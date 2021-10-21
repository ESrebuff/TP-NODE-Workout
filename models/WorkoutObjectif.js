import mongoose from 'mongoose'

const workoutObjectifSchema = new mongoose.Schema({
    userAndExoId: String,
    nameExos: String,
    pseudo: String,
    mail: String,
    roleUser: { type: Boolean, default: false },
    countRep: { type: Number, default: 0 },
    weightLifting: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
})

export const WorkoutObjectif = mongoose.model('WorkoutObjectif', workoutObjectifSchema)