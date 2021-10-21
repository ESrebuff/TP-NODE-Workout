import express from 'express'
const app = express()
import mongoose from 'mongoose'
import ejs from 'ejs'
import userRoutes from './routes/userRoutes.js'
import exoRoutes from './routes/exoRoutes.js'
import session from 'express-session'

(async function () {
    try {
        await mongoose.connect('mongodb+srv://test:test123@cluster0.rzxjh.mongodb.net/workoutdb?retryWrites=true&w=majority', {
            useNewUrlParser: true
        })
    } catch (error) {
        console.log(error)
    }
}())

const expiryDate = ()=> {
    return new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
}
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    secret: 'secrey_key',
    resave: false,
    saveUninitialized: false
}))
app.set('view engine', 'ejs')

app.use(userRoutes)
app.use(exoRoutes)

app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`)
})