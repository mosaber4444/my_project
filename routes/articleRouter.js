const multer = require('multer');
const express = require('express');
const router = express.Router();
const {
    createArticle,
    upload
} = require('../controllers/articlesController/articleController')

// router.post('/', createArticle);
router.post('/', upload.single('myFile'), createArticle);


module.exports = router;