const mongoose = require('mongoose');

let userSchema = mongoose.Schema({

    username:  {type:String,lowercase:true,unique:true},
    password:  {type:String},
    email:  {type:String,lowercase:true,unique:true},
    role:{type:String, default:'member'}
},{timestamps:true});


userSchema.methods.isMember = function(){
    return(this.role === 'member');
};


userSchema.methods.isAuther = function(){
    return(this.role === 'auther');
}

module.exports = mongoose.model('User', userSchema);