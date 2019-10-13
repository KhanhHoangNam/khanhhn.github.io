/**
 * @author khanhhn on 12/10/2019
 * @version 1.1
 * @project nodejsapp
 */
const express = require('express')
let router = express.Router()
const os = require('os')
// const currentDate = require('currentDate')

//Đọc URL parameter để xử lý logic
//http://127.0.0.1:8080/systemInfo?type=os
router.get('/', (req, res) => {
    let {type = ''} = req.query
    res.setHeader('Content-Type', 'text/html; charset=uff-8')
    switch(type.toLowerCase()) {
        case 'os':
            const osPlatform = os.platform()
            const osType = os.type()
            res.send(`<h1 style="color: blue;">Operating system's platform: ${osPlatform}, type: ${osType}</h1>`)
        case 'framework':
            res.send(`<h1 style="color: green">This is Express Framework</h1>`)
            break
        case 'date':
            let currentDate = new Date()
            res.send(`<h1>Current date is: ${currentDate.toUTCString()}</h1>`)
            break
        default:
            res.send(`<h1 style="color: red;">You enter wrong type</h1>`)
    }
}) 
module.exports = router