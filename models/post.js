const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const postSchema = new Schema({
    title:String,
    image:String,
    link:String,
    codeSource:String,
    videoLink:String,
    dateOfDev:String,
})

module.exports = mongoose.model('Post',postSchema)