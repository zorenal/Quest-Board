const express = require('express');

const userController = require('../controllers/UserController');
const questBoardController = require('../controllers/QuestBoardController')

const router = express.Router();

router.post('/login', userController.login, (req, res) => {return res.status(200).json(res.locals)})

router.post('/register', userController.addProject, userController.register, (req, res) => {return res.status(200).json(res.locals);});

router.post('/update',  questBoardController.getTasks,  (req, res) => {return res.status(200).json(res.locals)})

router.post('/newtask', questBoardController.newTask, questBoardController.getTasks, (req, res) => {return res.status(200).json(res.locals)})

router.post('/deletetask', questBoardController.deleteTask, questBoardController.getTasks, (req, res) => {return res.status(200).json(res.locals)})

router.post('/updatetask', questBoardController.updateTask, questBoardController.getTasks, (req, res) => {return res.status(200).json(res.locals)})

router.post('/assign', questBoardController.assignUser, questBoardController.getTasks, (req, res) => {return res.status(200).json(res.locals)})

module.exports = router;