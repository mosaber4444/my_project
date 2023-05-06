const multer  = require('multer');
const fs = require('fs');

const express = require('express');
const router = express.Router();
const {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    getDashboardPage,
    logout
} = require("../controllers/userControllers");



router.get("/register", getRegisterPage);
router.post("/register", registerUser)

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/dashboard", getDashboardPage);

router.get("/logout", logout);


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatar_users')
    },
    filename: function (req, file, cb) {
        cb(null,'new.jpeg')
    }
})

var upload = multer({ storage: storage })

router.post('/upload', upload.single('myFile'), async (req, res, next) => {
    try {
        const nameFile=  await req["session"]["user"]["_id"]
        const file = await req.file.path ; 
        console.log(file);
        fs.readFileSync(req.file.path);
        fs.renameSync(`./public/images/avatar_users/new.jpeg`, `./public/images/avatar_users/${nameFile}.jpg`);
        res.redirect("/user/login")
    } catch (error) {
        res.send(`somthing went error`);
        console.log(error)
    }
})


module.exports = router;
