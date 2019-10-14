/**
 * @author khanhhn on 14/10/2019
 * @version 1.0
 * @project nodejsapp
 */
//Task routers
var express = require('express')
var router = express.Router()

var taskData = require('./taskData')
router.get('/', async (req, res) => {
    res.json({
        result: "success",
        tasks: taskData,
        message: `Get list of tasks successfully!`
    })
})
//Request dạng "params"
router.get('/:id', async (req, res) => {
    const {id} = req.params
    if(isNaN(parseInt(id)) === true) {
        res.json({
            result: "failed",
            message: "You must enter task's id. Id must be a number"
        })
        return
    }
    let foundTask = taskData.find(task => task.id === parseInt(id))
    if(foundTask) {
        res.json({
            result: "success",
            task: foundTask,
            message: `Get task's detail successfully`
        })
    } else {
        res.json({
            result: "failed",
            task: {},
            message: `Can't find task with id = ${id}`
        })
    }
})
//Thêm mới 1 Task
router.post('/', async (req, res) => {
    let {title = '', completed = 0} = req.body
    //Thuộc tính "completed" nên 0,1 , không nên để  true, false
    if(["0", "1"].indexOf(completed) < 0) {
        res.json({
            result: "failed",
            message: "You must enter task's completed. Completed must be a number"
        })
        return
    }
    let taskWithMaxId = taskData.sort((t1, t2) => t1.id < t2.id)[0]
    taskData.push({
        id: taskWithMaxId.id + 1,
        title,
        completed: (parseInt(completed) > 0)
    })
    res.json({
        result: "success",
        task: taskData,
        message: `insert new task successfully!`
    })
})
//Sửa đổi 1 task => PUT method
router.put('/', async (req, res) => {
    const {id, title, completed} = req.body
    if(isNaN(parseInt(id)) === true) {
        res.json({
            result: "failed",
            message: "You must enter task's id. Id must be a number"
        })
        return
    }
    let foundTask = taskData.find(task => task.id === parseInt(id))
    if(foundTask) {
        foundTask.title = (title != null) ? title : foundTask.title
        if(["0", "1"].indexOf(completed) >= 0) {
            foundTask.completed = completed
        }
        res.json({
            result: "success",
            task: taskData,
            message: `Update a task successfully!`
        })
    } else {
        res.json({
            result: "failed",
            task: {},
            message: `Can't find task with id = ${id} to update`
        })
    }
})
module.exports = router