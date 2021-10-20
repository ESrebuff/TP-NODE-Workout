import express from 'express'
const router = express.Router()

router.get('/single', (req, res) => {
    res.render('single')
})

export default router