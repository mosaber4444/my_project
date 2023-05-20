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
    upload,
    deleteUser,
    updateUser
} = require("../controllers/users_controllers/userControllers");
const {registerValidator} = require("../midleware/validatorsUser/validatorUsers");
const {chekSessionUser} = require("../midleware/other/chekSessionUser")




router.get("/register",chekSessionUser, getRegisterPage);
router.post("/register",registerValidator, registerUser)

router.get("/login",chekSessionUser,getLoginPage);
router.post("/login", loginUser);

router.get("/dashboard",getDashboardPage);

router.get("/logout", logout);
router.get("/deleteUser",deleteUser);

router.patch("/" , updateUser)


router.post('/upload', upload.single('myFile'), uploadImageUsers );


module.exports = router;
