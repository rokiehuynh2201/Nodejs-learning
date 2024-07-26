module.exports.createPost = (req,res,next) => {
    if(!req.file){
        res.redirect("back")
    }
    if(!req.body.title){
        res.redirect("back")
    }
    next();
}

