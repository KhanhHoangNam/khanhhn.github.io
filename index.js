/**
 * @author khanhhn on 12/10/2019
 * @version 1.0
 * @project nodejsapp
 */
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
//Upload files
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    limits: {fileSize: 0.5 * 1024 * 1024} //Maximum 150MB
}))
const PORT = 8080
//Set View's engine
app.set('view engine', 'ejs') //Extended JavaScript
app.use(express.static(path.join(__dirname, 'javascripts')))//js in client
//Router
const systemInfo = require('./routes/systeminfo')
const redirectExample = require('./routes/redirectExample')
const books = require('./routes/books')
const files = require('./routes/files')
const users = require('./routes/users')
const tasks = require('./routes/task')
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(`<h1 style="color: red;">Hello World!</h1>`)
})
//http://localhost:8080/aboutus
app.get('/aboutus', (req, res) => {
    res.send(`This is about page`)
})
//http://localhost:8080/systemInfo
app.use('/systemInfo', systemInfo)
//http://localhost:8080/redirectExample
app.use('/redirectExample', redirectExample)
//http://localhost:8080/books
app.use('/books', books)
//http://localhost:8080/files
app.use('/files', files)
//error 404
//http://localhost:8080/users/bmi?name=Khanh&weight=54&height=1.64
app.use('/users', users)
//
app.use('/tasks', tasks)
app.use((req, res) => {
    const http404file = path.join(__dirname) + '/error404.html'
    res.status(404).sendFile(http404file)//Đưa sang một file html riêng?
})