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

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true

    },
   
});
mongoose.model('User', UserSchema);


module.exports = mongoose.model('User');
