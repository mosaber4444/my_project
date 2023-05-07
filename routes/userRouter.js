const multer  = require('multer');

const express = require('express');
const router = express.Router();
const {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    getDashboardPage,
    logout,
    uploadImageUsers,
    upload
} = require("../controllers/users_controllers/userControllers");



router.get("/register", getRegisterPage);
router.post("/register", registerUser)

router.get("/login", getLoginPage);
router.post("/login", loginUser);

router.get("/dashboard", getDashboardPage);

router.get("/logout", logout);


router.post('/upload', upload.single('myFile'), uploadImageUsers );


module.exports = router;
