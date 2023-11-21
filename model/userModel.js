const mongoose = require('mongoose');
const { error } = require('../auth.js/auth_Schema');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({  
    email: {
        type: String,
        required: [true, 'email is required']  
    },
    password: {
        type: String,
        required: [true, 'password is required'] 
    }

});
userSchema.pre('save',async function(next){
    //hashing a password before saving it to the database
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password=hashedPwd
        next()
    }
    catch (error){
        next(error)
    }
});

//user
userSchema.methods.isValidPassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }catch{
        throw error;
    }
    }

const User = mongoose.model('User', userSchema);
module.exports = User;