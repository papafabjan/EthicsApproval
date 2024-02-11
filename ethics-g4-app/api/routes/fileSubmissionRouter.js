const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pool = require("../db");

let application_id;

const updateApplicationId = (applicationId) =>{
    application_id = applicationId;
    console.log("update ",applicationId);
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = `application_id_${application_id}`;
    // const folderName = `${application_id}submission_${globalFolderCounter}`;
    const folderPath = `./submitFiles/${folderName}`;
    createFolderIfNotExists(folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb(null, field + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Bypass file type checking and accept all files
  cb(null, true);
};

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: fileFilter,
});


router.post("/execute-logic", async (req, res) => {
  try {
    // Perform logic to obtain the application ID
    const application_id = await pool.query(
      "SELECT id FROM applications ORDER BY id DESC LIMIT 1"
    );

    // Update application ID or perform other logic
    updateApplicationId(application_id.rows[0].id);

    console.log(application_id.rows[0].id);

    // Send the application ID in the response
    res.json({ applicationId: application_id.rows[0].id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Your route handling multiple file uploads
router.post("/multiple", upload.array("files"), async (req, res) => {
  // Check if req.files is empty
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }



  console.log(req.files);
  res.send("Multiple Files Upload successful");
});

function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

module.exports = router;
