import express from 'express'
const app = express()
import mongoose from 'mongoose'
import ejs from 'ejs'
import formRoutes from './routes/formRoutes.js'
import singleRoutes from './routes/singleRoutes.js'
import connectRoutes from './routes/connectRoutes.js'
import registerRoutes from './routes/registerRoutes.js'

(async function () {
    try {
        await mongoose.connect('mongodb://localhost:27017/workoutdb', {
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
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.use(formRoutes)
app.use(singleRoutes)
app.use(connectRoutes)
app.use(registerRoutes)
app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`)
})