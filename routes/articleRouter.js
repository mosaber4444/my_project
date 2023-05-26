const multer = require('multer');
const express = require('express');
const router = express.Router();
const {
    createArticle,
    upload,
    getArticles,
    getArticle ,
    getMyArticles,
    getArticleEdit
} = require('../controllers/articleController');

const {
    chekSessionUserArticle,
    chekSessionUserArticleEdit
} = require('../midleware/other/chekSessionUser');


//crud routes
router.get('/' , getArticles);
router.post('/', upload.single('myFile'), createArticle);





// render routes 
router.get('/' , getArticles);
router.get('/:id' , getArticle);
router.get('/my_article/:id' ,chekSessionUserArticle,getMyArticles);
router.get('/my_article/edit/:id' ,chekSessionUserArticleEdit,getArticleEdit);

module.exports = router;