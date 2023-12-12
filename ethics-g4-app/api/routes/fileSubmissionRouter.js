const express = require("express");
const router = express.Router();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './submitFiles')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '--' + file.originalname)
    }
})
  
const upload = multer({storage: fileStorageEngine})

router.post("/single",  upload.single("image"),(req, res) => {
    console.log(req.file);
    res.send("Single File Upload successful");
})

router.post("/multiple", upload.array("images", 5), (req, res) => {
    console.log(req.files);
    res.send("Multiple Files Upload successful");
})

module.exports = router;