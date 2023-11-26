const { default: mongoose } = require('mongoose');
const Student = require ('../model/studentsModel');
const createError = require('http-errors');
module.exports = {
    AddStudent: async (req, res) => {
        try {
            // Handling the request: Creating a new student instance with data from the request body
            const student = new Student(req.body);
    
            // Database communication: Saving the created student to the database using Mongoose's save method
            const result = await student.save();
    
            // Sending a response with the result of the database operation
            res.send(result);
    
        } catch (error) {
            // Handling errors: Logging the error message to the console
            console.log(error.message);
        }
    },
    
getAllStudents: async (req, res) => {
    try {
        const students = await Student.find({})
        res.send(students)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }
},
GetStudents:async (req, res, next)=>{
    const id = req.params.id;
    try{
    // res.send({type:'Get Request'});
    const student = await Student.findById(id)
    if (!student) {
        throw(createError(404, "student does not exists"))
    }
    res.send(student);
}catch(error){
    console.log(error.message);
    if (error instanceof mongoose.CastError){
        next(createError(400, "Invalid Student id"))
        return;
    }
    next(error)
}
},
UpdateStudents: async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const options = { new: true };
        const results = await Students.findByIdAndUpdate(id, update, options);

        if (!results) {
            return res.status(404).send({ error: 'Student not found' });
        }

        res.send(results);
    } catch (error) {
        console.error('UpdateStudents Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }    
},
DeleteStudent:async (req, res, next)=>{
    const id = req.params.id;
    try{
        const student = await Student.findByIdAndRemove(id)
        if (!student) {
            throw(createError(404, "student does not exists"))
        }
        res.send(student);
    }
    catch(error){
        console.log(error.message);
        if (error instanceof mongoose.CastError){
            next(createError(400, "Invalid Student id"))
            return;
        }
        next(error)
    }
}
};