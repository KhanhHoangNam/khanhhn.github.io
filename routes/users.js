/**
 * @author khanhhn on 12/10/2019
 * @version 1.0.0
 * @project nodejsapp
 */
const express = require('express')
const router = express.Router()
router.get('/bmi', async (req, res) => {
    //BMI = Body Mas Index
    let {name = '', weight = 0, height = 0} = req.query
    weight = parseFloat(weight)
    height = parseFloat(height)
    if(isNaN(weight) || isNaN(height)) { //NaN = Not a Number
        res.json({
            result: 'failed',
            message: 'Bạn phải nhập chiều cao và cân nặng'
        })
        return
    }
    if(name === "") {
        res.json({
            result: 'failed',
            message: 'Bạn phải nhập tên người'
        })
    }
    
    let bmi = Math.round(weight / (weight * height), 2)
    let message = ""
    if (bmi < 15) {
        message = "Quá gầy"
    } else if(bmi >= 15 && bmi < 18.5) {
        message = "Hơi gầy"
    } else if(bmi >= 18.5 && bmi < 25) {
        message = "Thể trạng bình thường"
    } else if(bmi >= 25 && bmi < 30) {
        message = "Hơi mập"
    } else if(bmi >= 30 && bmi < 40) {
        message = "Mập"
    } else if(bmi >= 40) {
        message = "Quá mập"
    }
    res.json({
        result: "success",
        data: bmi,
        message: `Chỉ số BMI của bạn: ${name} là: ${bmi} => ${message}`
    }) 
})
//http://127.0.0.1:8080/users/bmiPage
router.get('/bmiPage', async (req, res) => {
    //Muốn trả về một trang html?
    //Dùng định dạng .ejs = Extend Javascript
    res.render('bmiPage') //Tên file.ejs
})
let users = [{'admin': '@123'}, {'bob' : '#321'}, {'jane' : 'bob'}]
router.post('/login', async (req, res) => {
    //Phương thức POST gửi qua Postman, không dùng Chrome, Firefox
    let {name = '', password = ''} = req.body
    debugger
    const foundUer = users.find(user => {
        return user[name] === password
    })
    if(foundUer) {
        res.json({
            result: "success",
            message: "Đăng nhập thành công"
        })
    } else {
        res.json({
            result: "failed",
            message: "Tên hoặc mật khẩu sai"
        })
    }
})
//Login page
router.get('/loginPage', async (req, res) => {
    res.render('loginPage')
})
router.get('/loginFailed', async (req, res) => {
    res.render('loginFailed')
})
router.get('/loginSuccess', async (req, res) => {
    res.render('loginSuccess')
})
module.exports = router