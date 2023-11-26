const express = require('express');
const routes = express.Router();
const User = require('../model/userModel');
const userController = require ('../contoller/userController');
const { verifyAccessToken} = require('../helpers/jwtHelper');


//get a list of students from the database
// routes.post('/user/',userController.AddUser);
 routes.get('/user/:id',userController.GetUser);

 routes.put('/user/:id', userController.UpdateUsers);

routes.delete('/user/:id', userController.DeleteUser);


routes.post('/user', userController.AddUser);

routes.post('/login', userController.Login);

routes.post('/refresh', userController.refreshToken);



 module.exports = routes;


