const chekSessionUser = (req , res , next)=>{
    if (!!req.session.user) return res.redirect("/user/dashboard");
    next();
}

const chekSessionUserArticle = (req , res , next)=>{
    const id = req.session.user._id ; 
    if (id === req.params.id ) return next();
    res.redirect(url.format({
        pathname: "/user/register",
        query: {
            "errorMessage": "you dont say articles!!"
        }
    }))
}

const chekSessionUserArticleEdit = (req , res , next)=>{
    const id = req.session.user._id ; 
    console.log(` id : ${id}`);
    console.log(` id : ${req.params.id}`);    
    if (id === req.params.id ) return next();

    res.redirect('/user/login')
}




module.exports = {
    chekSessionUser,
    chekSessionUserArticle,
    chekSessionUserArticleEdit
}