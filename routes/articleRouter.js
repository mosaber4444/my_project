const multer = require('multer');
const express = require('express');
const router = express.Router();
const {
    createArticle,
    upload,
    getArticles,
    getArticle,
    getMyArticles,
    getArticleEdit,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');

const {
    chekSessionUserArticle,
    chekSessionUserArticleEditDelete,
    chekSessionUserArticleUpdate
} = require('../midleware/other/chekSessionUser');
const { deleteModel } = require('mongoose');


//crud routes
router.get('/', getArticles);
router.post('/', upload.single('myFile'), createArticle);
router.put('/', chekSessionUserArticleUpdate, updateArticle);
router.delete('/:id', chekSessionUserArticleEditDelete,deleteArticle);





// render routes 
router.get('/', getArticles);
router.get('/:id', getArticle);
router.get('/my_article/:id', chekSessionUserArticle, getMyArticles);
router.get('/my_article/edit/:id', chekSessionUserArticleEditDelete,getArticleEdit);

module.exports = router;