const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) =>  {
      cb(null, process.cwd() + '/storage')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

const upload = multer({ storage })
module.exports = upload