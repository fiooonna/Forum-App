const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let Question=new Schema({
    space:String,
    title:String,
    content:String,
    answer:[{type:String}],
    up:[{type:String}],
    time:String,
    creatorid:String,
    creatorName:String
});
module.exports=mongoose.model('Question',Question);
