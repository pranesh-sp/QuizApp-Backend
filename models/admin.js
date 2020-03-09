var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    course_id:{
        type: String,
        required:true,
    },
    f_id:{
        type: String,
        required:true
    }
   
});
mongoose.model('Admin', AdminSchema);


module.exports = mongoose.model('Admin');
