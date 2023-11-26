const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema
const studentsSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required'] 
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'] 
    },
    gender: {
        type: String
    }
});

// Creating a model that is going to represent our collection in the db
const Student = mongoose.model('Student', studentsSchema);

// Exporting this file so we can use it in other files
module.exports = Student;
