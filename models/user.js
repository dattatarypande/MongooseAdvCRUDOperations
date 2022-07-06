// init code
const mongoose = require('mongoose');
//user schema
const userSchema =mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
});

mongoose.model('users',userSchema);
// export module

module.exports =mongoose.model('users');