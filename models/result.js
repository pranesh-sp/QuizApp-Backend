var mongoose = require('mongoose');
var ResultSchema = new mongoose.Schema({
    quiz_id:{
        type: String,
        required:true,
    },
    roll_num: {
        type: String,
        required: true,
        
    },
    score:{
        type:String,
        required:true
    }
})
mongoose.model('Result', ResultSchema);


module.exports = mongoose.model('Result');