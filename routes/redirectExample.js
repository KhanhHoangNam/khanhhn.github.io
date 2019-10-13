/**
 * @author khanhhn on 12/10/2019
 * @version 1.0.0
 * @project nodejsapp
 */
const express = require('express')
let redirectFrom = ''
let router = express.Router()
router.get('/old', (req, res) => {
    if(redirectFrom === 'new') {
        redirectFrom = ""
        res.send(`This is Old !`)
    } else {
        redirectFrom = "old"
        res.redirect('/redirectExample/new')
    }
})
router.get('/new', (req, res) => {
    if(redirectFrom === 'old') {
        redirectFrom = ""
        res.send(`This is New !`)
    } else {
        redirectFrom = "new"
        res.redirect('/redirectExample/old')
    }
})
module.exports = router