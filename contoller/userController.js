const  mongoose  = require('mongoose');
const User = require('../model/userModel');
const {authSchema}= require ("../auth.js/auth_Schema");
const createError = require('http-errors');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwtHelper');


module.exports = {
AddUser: async (req, res, next) => {
    try {
        const {email, password}= req.body;
        const result = await authSchema.validateAsync(req.body);
   
        const Exists = await User.findOne({email: email})
        if(Exists) throw createError.Conflict(`email ${email} is already taken`)
        const user = new User(result);
   
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id)
        
   
        res.send({accessToken ,});
    }catch(error){
       if(error.isJoi === true)error.status = 422
       next(error)
    }   
    },
    Login:async(req, res, next)=>{
        try {
          const result = await authSchema.validateAsync(req.body);
          const user = await User.findOne({email:result.email});
          if (!user) throw createError.NotFound ('user not registered');
    
          const isMatch = await user.isValidPassword(result.password);
          if (!isMatch) throw createError.Unauthorized('username/password is not valid');
    
          const accessToken = await signAccessToken(user.id);
          const refreshToken = await signRefreshToken(user.id);
    
          res.send({accessToken, refreshToken})
        } catch (error) {
          if(error.isJoi == true) return next (createError.BadRequest('invalid username/password'))
          next(error)
        }
      },
      refreshToken:async(req, res, next)=>{
        try {
          const {refreshToken} = req.body;
          if(!refreshToken) throw createError.BadRequest();
          const UserId = await verifyRefreshToken(refreshToken);
          const accessToken = await signAccessToken(UserId);
          const refToken = await signRefreshToken(UserId);
          res.send({accessToken, refreshToken : refToken});
        } catch (error) {
          next(error);
        }
      },
GetUser:async (req, res, next)=>{
    const id = req.params.id;
try {
    const user = await User.findById(id)
    if (!user) {
        throw(createError(404, "user does not exists"))
    }  res.send(user);
}catch(error){
    console.log(error.message);
    if (error instanceof mongoose.CastError){
        next(createError(400, "Invalid user id"))
        return;
    }
    next(error)
}    
},
UpdateUsers: async (req, res, next)=>{
    try{
        const id = req.params.id;
        const update = req.body;
        const options = {new:true}
        const results = await User.findByIdAndUpdate (id, update, options)
    
         res.send(results);
    }
    catch(error){
        console.log(error.message)
    }
},
DeleteUser:async (req, res, next)=>{
    const id = req.params.id;
    try{
        const user = await User.findByIdAndRemove(id)
        if (!user) {
            throw(createError(404, "user does not exists"))
        }
        res.send(user);
    }
    catch(error){
        console.log(error.message);
        if (error instanceof mongoose.CastError){
            next(createError(400, "Invalid user id"))
            return;
        }
        next(error)
    }
}
}



  

