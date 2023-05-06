const url = require('url');
const User = require("../models/User");
const { log } = require('console');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const getRegisterPage = (req, res, next) => {
    if (req.session.user) return res.redirect("/user/dashboard");
    res.render("pages/register");
};

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
    if (req.session.user) return res.redirect("/user/dashboard");
    const { errorMessage = null } = req.query;
    res.render("pages/login", { errorMessage });
};

const loginUser = async (req, res, next) => {
    try {
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
                "errorMessage": "Server Error!"
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



module.exports = {
    getRegisterPage,
    registerUser,
    getLoginPage,
    loginUser,
    getDashboardPage,
    logout
    // uploadAvatar
}