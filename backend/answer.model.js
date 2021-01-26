const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let Answer=new Schema({
    qid:String,
    content:String,
    uid:String,
    uname:String,
    time:String
});
module.exports=mongoose.model('Answer',Answer,'Answer');
