const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pool = require("../db");

let applicationId;
let mode;

const updateApplicationId = (appId, m) => {
  applicationId = appId;
  mode = m; // Update mode globally
  console.log("Mode", mode);

  console.log("Update Application ID:", applicationId);
};

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = `application_id_${applicationId}`;
    const folderPath = `./submitFiles/${folderName}`;
    createFolderIfNotExists(folderPath);

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
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

router.post("/update-application-id", async (req, res) => {
  const mode = req.body.mode;
  applicationId = req.body?.applicationId;
  console.log("Mode", mode);
  try {
    if (mode === "apply") {
      // Perform logic to obtain the application ID
      const application = await pool.query(
        "SELECT id FROM applications ORDER BY id DESC LIMIT 1"
      );

      // Update application ID or perform other logic
      updateApplicationId(application.rows[0].id, mode);
      console.log(application.rows[0].id);
    } else if (mode === "edit") {
      updateApplicationId(applicationId, mode);
      console.log(applicationId);
    }
    const folderName = `application_id_${applicationId}`;
    const folderPath = `./submitFiles/${folderName}`;
    // If mode is edit, delete all previous files in the folder
    if (mode === "edit") {
      deleteAllFilesInFolder(folderPath);
    }
    // Send the application ID in the response
    res.json({ success: true, message: "Updated application ID successfully" });
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

  // Log uploaded files
  console.log("Uploaded files:", req.files);

  res.send("Multiple Files Upload successful");
});

function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

function deleteAllFilesInFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    console.log("Deleting files in folder:", folderPath); // Log folder path

    files.forEach((file) => {
      const filePath = `${folderPath}/${file}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
        console.log("Deleted file:", file); // Log deleted file
      });
    });
  });
}

module.exports = router;
