const { Article } = require("../../models/Article");

const chekSessionUser = (req, res, next) => {
    if (!!req.session.user) return res.redirect("/user/dashboard");
    next();
}

const chekSessionUserArticle = (req, res, next) => {
    const id = req.session.user._id;
    if (id === req.params.id) return next();
    res.redirect(url.format({
        pathname: "/user/register",
        query: {
            "errorMessage": "you dont say articles!!"
        }
    }))
}

const chekSessionUserArticleEditDelete = async (req, res, next) => {
    try {
        const idUser = req.session.user._id;
        const idArticle = req.params.id;
        const article = await Article.findById(idArticle).populate('writerId', '_id').exec();
        console.log(idUser.toString() , article.writerId._id.toString())
        if (idUser.toString() === article.writerId._id.toString()) return next(); 
        res.redirect('/user/login')
    } catch (err) {
        console.log(err);
    }
}

const chekSessionUserArticleUpdate = async (req, res, next) => {
    try {
        const idUser = req.session.user._id;
        const idArticle = req.body.idArticle;
        const article = await Article.findById(idArticle).populate('writerId', '_id').exec();
        if (idUser.toString() === article.writerId._id.toString()) return next(); 
        res.redirect('/user/login')
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    chekSessionUser,
    chekSessionUserArticle,
    chekSessionUserArticleEditDelete,
    chekSessionUserArticleUpdate
}