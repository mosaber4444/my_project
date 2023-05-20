const { Article } = require("../../models/User");
const fs = require('fs');
const multer = require('multer');

const createArticle = async (req, res, next) => {
    const newArticel = new Article({
        title: req.body.title,
        description: req.body.description,
        avatarsArticle: req.body.avatarsArticle,
        writerId: req.body.writerId,
        commentId: req.body.commentId,
    }) = req.body ;
     try {
        await newArticel.save()
     } catch (err) {
        console.log(err);
     }

}

const uploadImageArticle = async (req, res, next) => {
    try {
        const id = await req["session"]["user"]["_id"]
        console.log(id)
        const file = await req.file.path;
        console.log(file);
        fs.readFileSync(req.file.path);
        const addresAvatar = `/images/avatars_Article/`+ id + `.jpeg` ;
        await Article.updateOne({ _id: id }, { Article: addresAvatar})
    } catch (error) {
        res.send(`somthing went error`);
        console.log(error)
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatars_Article')
    },
    filename: function (req, file, cb) {
        const id = req.session.user._id
        cb(null, `${id}.jpeg`)
    }
})

const upload = multer({ storage: storage })