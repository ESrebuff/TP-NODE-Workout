import express from 'express'
const router = express.Router()

router.get('/form', (req, res) => {
    res.render('form')
})

export default router