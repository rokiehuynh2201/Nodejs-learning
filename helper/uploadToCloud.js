
const cloudinary = require("cloudinary").v2
const streamifier = require('streamifier')

cloudinary.config({ 
  cloud_name: "dboipzfot", 
  api_key: "298226843924288", 
  api_secret: "kgojHs9aOFndsD7YWfr1jzWAixg" 
});


let streamUpload = (buffer) => {
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

    streamifier.createReadStream(buffer).pipe(stream);
}); 
};

const upload = async (buffer)  => {
    let result = await streamUpload(buffer); 
    return result.secure_url
}

module.exports = upload;
