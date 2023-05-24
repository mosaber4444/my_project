const mongoose = require("mongoose");

const Articles = new mongoose.Schema({
    title : {
        required : true ,
        minlength : 3 ,
        type : String 
    },
    description : {
        minlength : 3 ,
        type : String
    },
    avatar :{
        type : String,
        default : 'a'

    },
    // avatarsArticle : {
    //     type : [String]
    // },
    writerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
})

const Article = mongoose.model("Article", Articles);

module.exports = {Article};