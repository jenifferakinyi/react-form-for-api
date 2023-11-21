const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Fix typo here: 'schema' to 'Schema'

// Creating a schema
const studentsSchema = new Schema({  // Fix typo here: 'schema' to 'Schema'
    firstname: {
        type: String,
        required: [true, 'firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
    },
    gender: {
        type: String, // Fix typo here: 'string' to 'String'
    }
});

// Creating a model that is going to represent our collection in the db
const Student = mongoose.model('Student', studentsSchema); // Use 'Student' instead of 'student'

// Exporting this file so we can use it in other files
module.exports = Student; // Fix variable name here: 'Students' to 'Student'
