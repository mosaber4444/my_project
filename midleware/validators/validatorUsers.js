const url = require('url');


const registerValidator = (req, res, next) => {
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8}$/;
    const regexMobile = /^[0-9]{11}$/;
    if (!req.body.firstName || !req.body.lastName) {
        return res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "First name and last name are required"
            }
        }));
    }
    if (req.body.username.length < 3) {
        return res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "Username should be at least 3 characters long"
            }
        }));
    }
    if (req.body.password.length < 8) {
        return res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "Password should be at least 8 characters long"
            }
        }));
    }
    if (!regexPass.test(req.body.password)) {
        return res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "Password is not valid"
            }
        }));
    }
    if (req.body.gender !== "male" && req.body.gender !== "female" && req.body.gender !== "not-set") {
        return res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "Invalid gender"
            }
        }));
    }
    if (!regexMobile.test(req.body.mobile)) {
        return res.redirect(url.format({
            pathname: "/user/register",
            query: {
                "errorMessage": "Invalid mobile number"
            }
        }));
    }
    next();
}

module.exports = {registerValidator};