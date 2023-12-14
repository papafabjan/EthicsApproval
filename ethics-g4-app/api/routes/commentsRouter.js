const express = require("express");
const router = express.Router();
const pool = require("../db");


router.post("/comments/add", async (req, res) => {
  const { comments, applicationId, userId } = req.body;

  try {
    // Flatten the comments array into [commenter_id, field, content, application_id]

    const flattenedComments = comments.map((comment) => [
      userId,
      comment.field,
      comment.content,
      applicationId,
    ]);

    // Insert comments into the database
    const commentInsertQuery = await pool.query(
      "INSERT INTO comments (commenter_id, field, content, application_id) VALUES " +
        flattenedComments
          .map(
            (_, index) =>
              `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${
                index * 4 + 4
              })`
          )
          .join(", "),
      flattenedComments.flat()
    );
    // Update the status column of the application
    const updateStatusQuery = await pool.query(
      "UPDATE applications SET status = 'Comments added, awaiting review by applicant' WHERE id = $1",
      [applicationId]
    );
    console.log(userId, applicationId);
    res.status(201).json({ message: "Comments saved successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;