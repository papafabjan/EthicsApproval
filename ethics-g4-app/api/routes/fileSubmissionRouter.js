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
});

const fileFilter = (req, file, cb) => {
    // Bypass file type checking and accept all files
    cb(null, true);
};

const upload = multer({
    storage: fileStorageEngine,
    fileFilter: fileFilter
});

// Your route handling multiple file uploads
router.post("/multiple", upload.array("files[]"), (req, res) => {
    // Check if req.files is empty
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    console.log(req.files);
    res.send("Multiple Files Upload successful");
});

module.exports = router;