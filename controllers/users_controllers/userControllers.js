const url = require('url');
const User = require("../../models/User");
const { log } = require('console');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

function getRegisterPage(req, res, next) {
    const { errorMessage = null } = req.query;
    res.render("pages/register", { errorMessage });
}

const registerUser = async (req, res, next) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        mobile: req.body.mobile,
        gender: req.body.gender,
        role: req.body.role
    });
    try {
        await newUser.save();
        res.redirect("/user/login");
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "Server Error!"
            }
        }))
    };
};

const getLoginPage = (req, res, next) => {
    const { errorMessage = null } = req.query;
    res.render("pages/login", { errorMessage });
};

const loginUser = async (req, res, next) => {
    try {
        if (req.session.user) return res.redirect("/user/dashboard");
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.redirect(`/user/login?errorMessage=User not found!`);

        const isMatch = await user.validatePassword(req.body.password);
        if (!isMatch) return res.redirect(`/user/login?errorMessage=User not found!`);

        req.session.user = user;
        res.redirect("/user/dashboard");
    } catch (err) {
        res.redirect(url.format({
            pathname: "/user/login",
            query: {
                "errorMessage": "somothing went error"
            }
        }))
    };
};

const getDashboardPage = (req, res, next) => {
    if (!req.session.user) return res.redirect("/user/login");
    console.log(req.session.user);
    res.render("pages/dashboard", { user: req.session.user });
};

const logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/user/login");
};

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.session.user._id);
        req.session.destroy();
        res.redirect("/user/register");
    } catch (error) {
        console.log(error);
    }
};

const uploadImageUsers = async (req, res, next) => {
    try {
        const id = await req["session"]["user"]["_id"]
        console.log(id)
        const file = await req.file.path;
        console.log(file);
        fs.readFileSync(req.file.path);
        const addresAvatar = await `./public/images/avatar_users/`+ id + `.jpeg` ;
        await User.updateOne({ _id: id }, { avatar: addresAvatar})
        await res.redirect("/user/login")
    } catch (error) {

        res.send(`somthing went error`);
        console.log(error)
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatar_users')
    },
    filename: function (req, file, cb) {
        const id = req.session.user._id
        cb(null, `${id}.jpeg`)
    }
})

const upload = multer({ storage: storage })



module.exports = {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    getDashboardPage,
    logout,
    uploadImageUsers,
    upload,
    deleteUser
};