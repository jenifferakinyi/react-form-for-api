const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../model/userModel');
const { authSchema } = require('../auth.js/auth_Schema');


module.exports = {
  signAccessToken: (UserId) => {
    return new Promise((resolve, reject) => {
      const payload = { UserId }; // Include UserId in the payload
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1min',
        issuer: 'EddTechnologies.com',
        audience: UserId,
      }
      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          console.log(error.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  //middleware to verify access token
  verifyAccessToken:(req, res, next)=>{
    if(!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
      if(err){
        return next(createError.Unauthorized())
      }
      req.payload = payload
      next(err)
    })
  },
  signRefreshToken:(UserId)=>{
    return new Promise((resolve,reject)=>{
      const payload = {}
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn:'1y',
        issuer:"EddTechnologies",
        audience: UserId,
      }
      JWT.sign(payload,secret,options,(error,token)=>{
        if(error)reject(error);
        resolve(token);
      });
    });
  },
  verifyRefreshToken:(refreshToken)=>{
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
        if(err) return reject(createError.Unauthorized())
        const UserId = payload.aud;

        resolve(UserId);
      });
    });
  },

}
