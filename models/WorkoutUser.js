import mongoose from 'mongoose'

const workoutUserSchema = new mongoose.Schema({
    pseudo: String,
    mail: String,
    password: String,
    role: { type: Boolean, default: false },
    count: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
})

export const WorkoutUser = mongoose.model('WorkoutUser', workoutUserSchema)