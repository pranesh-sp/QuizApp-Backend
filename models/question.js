var mongoose = require('mongoose');
var QuestionSchema = new mongoose.Schema({
    quiz_id:{
        type: String,
        required:true,
    },
    question:{
        type: String,
        required:true,
    },
    option_1:{
        type: String,
        required:true,
    },
    
    option_2:{
        type: String,
        required:true,
    },
    
    option_3:{
        type: String,
        required:true,
    },
    
    option_4:{
        type: String,
        required:true,
    },
    
    option_1:{
        type: String,
        required:true,
    },

});

mongoose.model('Question', QuestionSchema);
module.exports = mongoose.model('Question');