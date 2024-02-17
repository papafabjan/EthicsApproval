const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

function send_mail(subjects, recipientTypes, recipient_names, recipient_emails, status, user_role, projectTitle) {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailOptions;
  let applicantName = recipient_names[0];

  // Iterate over each recipient and send an email
  Promise.all(
    recipient_emails.map((email, index) => {
      console.log(recipientTypes[index]);
      console.log(index);
      mailOptions = {
        from: `ethicsTeam <${process.env.USER}>`,
        to: email,
        subject: subjects[index],
        html: pick_html_message(recipientTypes[index],recipient_names[index], status, user_role, projectTitle,applicantName),
      };
      console.log("email has been sent", email);
      console.log(recipient_names[index])
      // Sending both staff and applicant emails for each recipient
      return Promise.all([
        transport.sendMail(mailOptions),

      ]);
    })
  )
    .then(results => {
      console.log("Success: ", results);
      transport.close();
    })
    .catch(error => {
      console.log("Error: ", error);
      transport.close();
    });
}

function pick_html_message(user_type, recipient_name, status, user_role, projectTitle, applicantName) {
  if (user_type === "admin") {
    if (status === "Approved by supervisor, pending reviewers addition") {
      return `
        <h3>Dear ${recipient_name}, the application (${projectTitle}) has been approved by ${user_role}</h3>
        <p>The next step is for you to assign reviewer(s)!</p>
        <p>Press the button if you want to be transferred to your dashboard.</p>
        <a href="http://localhost:3000/dashboard">Check dashboard</a>
      `;
    } else if (status === "Reviewer approval complete, pending ethics admin's approval") {
      return `
        <h3>Dear ${recipient_name}, the application (${projectTitle}) has been approved by ${user_role}</h3>
        <p>The next step is for you approve it for the last time!</p>
        <p>Press the button if you want to be transferred to your dashboard.</p>
        <a href="http://localhost:3000/dashboard">Check dashboard</a>
      `;
    }
  } else if (user_type === "applicant") {
    if (status === "Pending supervisor's admission") {
      return `
        <h3>Dear ${recipient_name}, your application (${projectTitle}) has been submitted!!</h3>
        <p>Your application status has been updated to: ${status}</p>
        <p>Press the button if you want to be transferred to MyApplications.</p>
        <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
      `;
    } else if (status === "Approved by supervisor, pending reviewers addition") {
      return `
      <h3>Dear ${recipient_name}, your application (${projectTitle}) has been approved by the supervisor!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Reviewers assigned by Ethics Admin") {
      return `
      <h3>Dear ${recipient_name}, Reviewers have been assigned to you application (${projectTitle}) !!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status.includes("by") && (status.includes("reviewers") || status.includes("Reviewers"))) {
      return `
      <h3>Dear ${recipient_name}, your application (${projectTitle}) has been approved by a reviewer!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Reviewer approval complete, pending ethics admin's approval") {
      return `
      <h3>Dear ${recipient_name}, your application (${projectTitle}) has been approved by the reviewer(s). Now it is time for the ethics administrator to approve it. !!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Approved") {
      return `
      <h3>Dear ${recipient_name}, your application (${projectTitle}) has been finally approved by everyone!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Comments added, awaiting review by applicant") {
      return `
      <h3>Dear ${recipient_name}, your application (${projectTitle}) has been commented.!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>You have to edit your application so it can proceed to the next step.</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
  } else if (user_type === "supervisor") {
    if (status === "Pending supervisor's admission") {
      return `
        <h3>Dear ${recipient_name},</h3>
        <p>Applicant  ${applicantName} has selected you as their supervisor for the project (${projectTitle}). You need to review the application as supervisor before it is submitted for Ethics review.
        Please read the attached application carefully following the instructions at the Ethics Application website / Guide for reviewers.
        Inside the site you have two options:</p>
        <p>1. Approve the application
           2. Comment on the application to ask for additional information</p>
        <p>Press the button if you want to be transferred to Dashboard.</p>
        <a href="http://localhost:3000/Dashboard">Check Dashboard</a>
      `;
    }
  } else if (user_type === "reviewers") {
     if (status === "Reviewers assigned by Ethics Admin") {
      return `
      <h3>Dear ${recipient_name},</h3>
      <p>You have been assigned as a reviewer for the project (${projectTitle}). Please read the attached application carefully following the instructions at the Ethics Application website / Guide for
      reviewers.</p>
      <p>   Inside the site you have two options:</p>
      <p>   1. Approve the application
            2. Comment on the application to ask for additional information</p>
      <p>Press the button if you want to be transferred to Dashboard.</p>
      <a href="http://localhost:3000/Dashboard">Check Dashboard</a>
    `;
    }
  }  else {
    // Default empty message
    return "";
  }
  return "Bad code";
}



module.exports = send_mail;
