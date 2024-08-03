const cloudinary = require("cloudinary").v2
const streamifier = require('streamifier')

cloudinary.config({ 
  cloud_name: "dboipzfot", 
  api_key: "298226843924288", 
  api_secret: "kgojHs9aOFndsD7YWfr1jzWAixg" // Click 'View Credentials' below to copy your API secret
});

module.exports.uploadCloud = (req, res, next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body.image = result.secure_url
            next();
        }
        upload(req);
    }
    else{
      next();
    }
}