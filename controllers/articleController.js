const { Article } = require("../models/Article");
const fs = require('fs');
const multer = require('multer');

//crud 

const createArticle = async (req, res, next) => {
    console.log(req.body)
    try {
        const { title, description } = req.body;
        const writerId = req.session.user._id;
        const file = req.file; // Get the uploaded file

        const newArticle = new Article({
            title,
            description,
            writerId,
            avatar: `/images/avatars_Article/${file.filename}` // Save the file path in the 'avatar' field
        });

        await newArticle.save();
        res.redirect("/user/dashboard");
    } catch (err) {
        console.log(err)
        res.redirect('/user/dashboard?errorMessage=something went wrong');
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatars_Article');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// get 
const getArticles = async (req, res, next) => {
    try {
        const articles = await Article.find({})
            .populate('writerId', 'firstName lastName username')
            .exec();
        console.log(articles);
        res.status(200).render('pages/articles', { data: articles });
    } catch (err) {
        console.log(err);

    }
};

const getArticle = async (req, res, next) => {
    try {
        const id = req.params.id;

        const article = await Article.findById(id)
            .populate('writerId', 'firstName lastName username')
            .exec();
        console.log(article);
        res.status(200).render('pages/article', { data: article });
    } catch (err) {
        console.log(err);
    }
};

const getMyArticles = async (req, res, next) => {
    try {
        const id = req.params.id;
        const articles = await Article.find({ writerId: id })
            .populate('writerId', 'firstName lastName username')
            .exec();
        console.log(articles);
        res.status(200).render('pages/myArticles', { data: articles });
    } catch (err) {
        console.log(err);
    }
};

const getArticleEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const article = await Article.findById(id)
            .populate('writerId', 'firstName lastName username')
            .exec();
        console.log(article);
        res.status(200).render('pages/articleEdit', { data: article });
    } catch (err) {
        console.log(err);
    }
};




module.exports = {
    createArticle,
    upload,
    getArticles,
    getArticle,
    getMyArticles,
    getArticleEdit
}
