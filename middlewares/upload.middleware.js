const upload = require("../helper/uploadToCloud")

module.exports.uploadCloud = async (req, res, next) => {
    if(req.file){
        const link = await upload(req.file.buffer);
        req.body.image = link 
    }
    next();
}