const mongoose  = require('mongoose');

const postSchema = new mongoose.Schema({
    card_id:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer_1:{
        type:String,
        required:true
    },
    answer_2:{
        type:String,
        required:true
    },
    answer_3:{
        type:String,
        required:true
    },
    answer_4:{
        type:String,
        required:true
    },
    correct_answer:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('question_and_answer',postSchema);