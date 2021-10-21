import mongoose from 'mongoose'

const workoutExoSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }
})

export const WorkoutExos = mongoose.model('WorkoutExos', workoutExoSchema)