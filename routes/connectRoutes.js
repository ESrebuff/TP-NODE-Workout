import express from 'express'
const router = express.Router()

router.get('/connect', (req, res) => {
    res.render('connect')
})

router.get('/connect/admin', (req, res) => {
    res.render('connect-admin')
})

export default router