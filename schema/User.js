var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:'Zim',
        unique:true
    },
    sell:Number

});

var User = mongoose.model("User", userSchema);

module.exports = User;