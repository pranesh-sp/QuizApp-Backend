var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
    Course_name:{
        type: String,
        required: true
       
    },
    course_code:{
        type: String,
        unique: true
        
    },
    
    mentor:{
        type: String,
        required:true
        
    },
   
});
mongoose.model('Course', CourseSchema);


module.exports = mongoose.model('Course');
