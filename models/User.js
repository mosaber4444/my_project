const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    gender: {
        type: String,
        default: 'set-not',
        enum: ['male', 'female', 'not-set']
    },
    mobile: {
        type: String,
        unique: true,
        required :true
        },
    role: {
        type: String,
        default: 'blogger',
        enum: ['admin', 'blogger']
    },
    avatar: {
        type : String,
        default: '',
    }
},  {
    timestamps : true
});

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
        required : false , 
        type : String    
    },
    avatarsArticle : {
        required : false
    },
    writerId : {
        required : true 
    },
    commentId : []
})

const comments = new mongoose.Schema({
    writerId : {
        required : true 
    }
})



UserSchema.pre("save", async function (next) {
    if (!this.isNew && !this.isModified('password')) return next();

    try {
        const mmd = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, mmd);
        return next();
    } catch (err) {
        next(err);
    };
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const Article = mongoose.model("Article", Articles);

module.exports = mongoose.model("user", UserSchema);
module.exports = Article;