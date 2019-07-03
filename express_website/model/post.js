const mongoose = require('mongoose');

let postSchema = mongoose.Schema({

    title:  {type:String,required:true},
    
    auther: {type:mongoose.Schema.Types.ObjectId, ref:'User'},

    content: {type:String,default:''},

    publishDate: {type:Date,default:Date.now},

    view: {type:Number, default:0},

    comments: [{
        commenter:String,
        content:{type:String, default:''}
    }],

   

});

module.exports = mongoose.model('Post', postSchema);