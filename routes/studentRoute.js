const express = require('express');
const routes = express.Router();
const Student = require('../model/studentsModel')
const studentController = require ('../contoller/studentController');

routes.get('/students',  studentController.getAllStudents);
// get a list of students from the database
routes.get('/students/:id',studentController.GetStudents);

// add student to the db
//route configuration where the path is '/students'
routes.post('/students',studentController.AddStudent);

//update students in the db
routes.patch('/students/:id',studentController.UpdateStudents);
// delete student from the db
routes.delete('/students/:id',studentController.DeleteStudent);
module.exports = routes;


