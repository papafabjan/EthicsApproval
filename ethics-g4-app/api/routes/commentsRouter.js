const express = require("express");
const router = express.Router();
const pool = require("../db");
const send_mail = require("../gmailApi");

router.post("/comments/add", async (req, res) => {
  const { comments, applicationId, userId } = req.body;

  try {
    // Flatten the comments array into [commenter_id, field, content, application_id]
    const applicationStatusQuery = await pool.query(
      "SELECT status FROM applications WHERE id = $1",
      [applicationId]
    );
    const applicationStatus = applicationStatusQuery.rows[0].status;
    const flattenedComments = comments.map((comment) => [
      userId,
      comment.field,
      comment.content,
      applicationStatus,
      applicationId,
    ]);

    // Insert comments into the database
    const commentInsertQuery = await pool.query(
      "INSERT INTO comments (commenter_id, field, content, application_status, application_id) VALUES " +
        flattenedComments
          .map(
            (_, index) =>
              `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${
                index * 5 + 4
              }, $${index * 5 + 5})`
          )
          .join(", "),
      flattenedComments.flat()
    );

    // Update the status column of the application
    const updateStatusQuery = await pool.query(
      "UPDATE applications SET status = 'Comments added, awaiting review by applicant' WHERE id = $1",
      [applicationId]
    );

    // Send automated emails
    const userIDQuery = await pool.query(
      "SELECT applicant_id FROM applications WHERE id = $1",
      [applicationId]
    );
    const userID = userIDQuery.rows[0].applicant_id;
    const applicantInfo = await pool.query(
      "SELECT username, email, user_id FROM users WHERE user_id = $1",
      [userID]
    );
    const applicantName = applicantInfo.rows[0].username;
    const applicantEmail = applicantInfo.rows[0].email;
    var subject = ["Comments added, awaiting review by you"];
    var recipientNames = [applicantName];
    var recipientEmails = [applicantEmail]; // Always pass as array
    var recipientTypes = ["applicant"];
    
    const projectTitleQuery = await pool.query(
      "SELECT field_value FROM application_content WHERE application_id = $1 AND field_name = 'ResearchProject'",
      [applicationId]
    );
    const projectTitle = projectTitleQuery.rows[0].field_value;
    var userRole = "applicant";
    console.log(recipientEmails, recipientNames);
    send_mail(subject, recipientTypes, recipientNames, recipientEmails, applicationStatus, userRole, projectTitle);



    console.log(userId, applicationId);
    res.status(201).json({ message: "Comments saved successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/comments/:applicationId", async (req, res) => {
  try {
    const { applicationId } = req.params;
    console.log(applicationId);
    
    const commentsFetch = await pool.query(
      "SELECT * FROM comments WHERE application_id = $1",
      [applicationId]
    );
    const comments = commentsFetch.rows;
    console.log(comments);
    res.status(201).json(comments);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
