var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roll_num: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_faculty: {
        type: Number,
        required: true

    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true

    },
    degree: {
        type: String,
        

    },
    branch: {
        type: String,
        
    },
    quiz_id: {
        type: String,
        
    },
    mark: {
        type: Number,
        
    }
   
});
mongoose.model('User', UserSchema);


module.exports = mongoose.model('User');
