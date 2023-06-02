const { Console } = require("console");
const { Article } = require("../models/Article");
const fs = require('fs');
const multer = require('multer');

//crud 

//creat article
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



//update Article
const updateArticle = async (req, res, next) => {
    try {
        const id = req.session._id;
        const idArticleForUpdate = req.body.idArticle;
        const updatedArticle = {};
        if (!!req.body.title) updatedArticle.title = req.body.title;
        if (!!req.body.description) updatedArticle.description = req.body.description;
        await Article.findByIdAndUpdate(idArticleForUpdate, updatedArticle);
        res.redirect(`/article/${id}`);
    } catch (err) {
        console.log(err);
    }
}

//delete Article
const deleteArticle = async (req, res, next) => {
    try {
        console.log('test')
        const idArticle = req.params.id;
        const article = await Article.findById(idArticle);
        const fileName = article.avatar;
        fs.unlinkSync(`public${fileName}`);
        await Article.findByIdAndRemove(idArticle);
        res.redirect(`/article/${id}`);
    } catch (err) {
        console.log(err)
    }
}

// get 
const getArticles = async (req, res, next) => {
    try {
        const articles = await Article.find({})
            .populate('writerId', 'firstName lastName username')
            .exec();
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
    getArticleEdit,
    updateArticle,
    deleteArticle
}
