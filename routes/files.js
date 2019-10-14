/**
 * @author khanhn on 12/10/2019
 * @version 1.0.0
 * @project nodejsapp
 */
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')//fs = file system
const promisify = require('util').promisify//Thư viện này có sẵn trong nodejs
const readdir = promisify(fs.readdir)//Hàm này lấy các giá trị file/folder trong thư mục
const lssat = promisify(fs.lstat)//lsstat = "list status"
router.get('/', async (req, res) => {
    // res.send(`This will show a list of Files`)
    try {
        const currentFolder = path.join(__dirname)
        const files = await readdir(currentFolder)
        let numberOfFolders = 0
        let numberOfFiles = 0 
        let i = 0
        let content = ""     
        if(files.length === 0) {
            content = `<p>This folder: ${currentFolder} is empty</p>`
            res.send(content)
            return
        }
        files.forEach(async (file) => {
            const stat = await lssat(`${currentFolder}/${file}`)
            if(stat.isFile()) {
                numberOfFiles = numberOfFiles + 1
            } else {
                numberOfFolders = numberOfFolders + 1
            }
            content = `${content}<li><a href="">${i+1}. ${file}</a></li>`
            if(i === files.length - 1) {
                //Phần tử cuối trong mảng
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                content = `${content}<p>There are ${numberOfFiles} files and ${numberOfFolders} folders</p>`
                res.send(content)
                return
            }
            i = i + 1
            // debugger
        })
    } catch (error) {
        res.send(`Error when reading files in Folder: ${error}`)
    }
})
//upload multiple files
router.post('/uploads', async (req, res) => {
    //Dữ liệu files được lưu tại: req.files
    try {
        if(!req.files) {
            res.json({
                result: "failed",
                message: `Can't find files to upload`
            })  
            return
        }
            const keys = Object.keys(req.files)
            if(keys.length === 0) {
                res.json({
                    result: "failed",
                    message: `Can't find files to upload`
                })    
                return
            }
            keys.forEach(async (key) => {
                const fileName = `${Math.random().toString(36)}`
                const fileObject = await req.files[key]
                const fileExtension = fileObject.name.split('.').pop()
                const destination = `${path.join(__dirname, '..')}/uploads/${fileName}.${fileExtension}`
                let error = await fileObject.mv(destination)
                if(error) {
                    res.json({
                        result: "failed",
                        message: `Can't find files to upload`
                    })    
                    return
                }
                //Kiểm tra file cuối cùng trong List?
                if(key === keys[keys.length - 1]) {
                    res.json({
                        result: "Success",
                        message: `Upload files successfully!`
                    })    
                    return
                }
            })
        
    } catch (error) {
        res.json({
            result: "failed",
            message: `Can't upload files. Error: ${error}`
        })
    }
})
module.exports = router