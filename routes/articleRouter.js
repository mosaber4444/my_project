const multer  = require('multer');
const express = require('express');
const router = express.Router();
const {
    createArticle,
    uploadImageArticle
} = require('../controllers/articlesController/articleController')

router.post('/', createArticle ,upload.single('myFile'), uploadImageArticle );


module.exports = router;