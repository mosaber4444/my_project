const chekSessionUser = (req , res , next)=>{
    if (!!req.session.user) return res.redirect("/user/dashboard");
    next();
}


module.exports = {
    chekSessionUser
}