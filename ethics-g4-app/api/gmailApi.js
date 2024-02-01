const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

function send_mail(subjects, recipientTypes, recipient_names, recipient_emails, status, user_role, application_id) {
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

  // Iterate over each recipient and send an email
  Promise.all(
    recipient_emails.map((email, index) => {
      mailOptions = {
        from: `ethicsTeam <${process.env.USER}>`,
        to: email,
        subject: subjects[index],
        html: pick_html_message(recipientTypes[index],recipient_names[index], status, user_role, application_id),
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

function pick_html_message(user_type, recipient_name, status, user_role, application_id) {
  if (user_type === "admin") {
    if (status === "Approved by supervisor, pending reviewers addition") {
      return `
        <h3>Hello ${recipient_name}, the application (${application_id}) has been approved by ${user_role}</h3>
        <p>The next step is for you to assign reviewer(s)!</p>
        <p>Press the button if you want to be transferred to your dashboard.</p>
        <a href="http://localhost:3000/dashboard">Check dashboard</a>
      `;
    } else if (status === "Reviewer approval complete, pending ethics admin's approval") {
      return `
        <h3>Hello ${recipient_name}, the application (${application_id}) has been approved by ${user_role}</h3>
        <p>The next step is for you approve it for the last time!</p>
        <p>Press the button if you want to be transferred to your dashboard.</p>
        <a href="http://localhost:3000/dashboard">Check dashboard</a>
      `;
    }
  } else if (user_type === "applicant") {
    if (status === "Pending supervisor's admission") {
      return `
        <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
        <p>Your application status has been updated to: ${status}</p>
        <p>Press the button if you want to be transferred to MyApplications.</p>
        <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
      `;
    } else if (status === "Approved by supervisor, pending reviewers addition") {
      return `
      <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Reviewers assigned by Ethics Admin") {
      return `
      <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Approved by X/Y reviewers") {
      return `
      <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Reviewer approval complete, pending ethics admin's approval") {
      return `
      <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
    else if (status === "Approved") {
      return `
      <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
  } else if (user_type === "supervisor") {
    if (status === "Pending supervisor's admission") {
      return `
        <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
        <p>Your application status has been updated to: ${status}</p>
        <p>Press the button if you want to be transferred to MyApplications.</p>
        <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
      `;
    }
  } else if (user_type === "reviewer") {
     if (status === "Reviewers assigned by Ethics Admin") {
      return `
      <h3>Hello ${recipient_name}, your application (${application_id}) has been submitted!!</h3>
      <p>Your application status has been updated to: ${status}</p>
      <p>Press the button if you want to be transferred to MyApplications.</p>
      <a href="http://localhost:3000/MyApplications">Check MyApplications</a>
    `;
    }
  }  else {
    // Default empty message
    return "";
  }
  return html_message;
}

function html_message_submit(recepient_name, status, user_role, application_id) {
  return `
        <h3> Dear ${recepient_name} </h3>
        <p> Student Doe has selected you as their supervisor for the project test. You need to review the application as supervisor before it is submitted for Ethics review.
        Please read the attached application carefully following the instructions at the Ethics Application website / Guide for reviewers.
        At the bottom of this email you will have two options:
        Acknowledge receipt: Selecting this button if you completely agree with the application. This option will directly forward the application for ethics review.
        Comment: Selecting this option will open a browser window where you can add a comment to the student. IMPORTANT: In this window you will again have two options (Acknowledge Receipt or Request More Info). Selecting Acknowledge Receipt, will also forward the application for ethics approval, but send your comments to the student. If you want the student to make changes before the submission you should press the Request More Info link to send the application back to the student. </p>

        <p> Press the button if you want to be transfered to your dashboard. </p>
        <a href="http://localhost:3000/dashboard"> Check dashboard </a>


      `;
}


function html_message_applicant_submit_applicant(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, your application: ${application_id} has been approved by ${user_role}</h3>
        <p> Your application status has been updated to: ${status} </p>

        <p> Press the button if you want to be transfered to MyApplications. </p>
        <a href="http://localhost:3000/ MyApplications"> Check  MyApplications </a>
        <!-- Add your customized HTML content here -->
      `;
}

function html_message_reviewers_addition(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, the application: ${application_id} has been approved by ${user_role} </h3>
        <p> The next step is for <strong>you</strong> to assign reviewer(s)! </p>

        <p> Press the button if you want to be transfered to your dashboard. </p>
        <a href="http://localhost:3000/dashboard"> Check dashboard </a>


      `;
}


function html_message_applicant_reviewers_addition(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, your application: ${application_id} has been approved by ${user_role}</h3>
        <p> Your application status has been updated to: ${status} </p>

        <p> Press the button if you want to be transfered to MyApplications. </p>
        <a href="http://localhost:3000/ MyApplications"> Check  MyApplications </a>
        <!-- Add your customized HTML content here -->
      `;
}

function html_message_reviewers_assigned(recepient_name, status, user_role, application_id) {
  return `
        <h3> Dear ${recepient_name}, </h3>
        <p> You have been assigned as a reviewer for the project A project title. Please read the attached application carefully following the instructions at the Ethics Application website / Guide for
        reviewers.
        Complete Task
        Ethics Application System - T
        At the bottom of the email you will have two options:
        Complete Task: Selecting this button if you completely agree with the application. This option will directly approve it and no further steps will be needed from your part. No comments will send to the applicant.
        Comment: Selecting this option will open a browser window where you can add a comment to the student. IMPORTANT: In this window you will again have two options (Confirm or Comment). Selecting Confirm, also will approve the application. but will also send your comments to the applicant. Selecting Comment, will send an email to the applicant with your comments, requesting changes to me made. The applicant will have to Edit the application and resubmit it. If you want the applicant to make changes before you accept the application, then you should use this option. </p>

        <p> Press the button if you want to be transfered to your dashboard. </p>
        <a href="http://localhost:3000/dashboard"> Check dashboard </a>

      `;
}


function html_message_applicant_reviewers_assigned(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, reviewers have benn assigned to your application: ${application_id}</h3>
        <p> Your application status has been updated to: ${status} </p>

        <p> Press the button if you want to be transfered to MyApplications. </p>
        <a href="http://localhost:3000/ MyApplications"> Check  MyApplications </a>
        <!-- Add your customized HTML content here -->
      `;
}

function html_message_ethics_approval(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, You need to approve the application: ${application_id} </h3>
        <p> This is the last step for the application to be Approved!!! </p>

        <p> Press the button if you want to be transfered to your dashboard. </p>
        <a href="http://localhost:3000/dashboard"> Check dashboard </a>

      `;
}


function html_message_applicant_ethics_approval(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, Ethics administrator needs to apporve your application: ${application_id}</h3>
        <p> Your application status has been updated to: ${status} </p>
        <p> This is the final step for the approval of your application </p>

        <p> Press the button if you want to be transfered to MyApplications. </p>
        <a href="http://localhost:3000/ MyApplications"> Check  MyApplications </a>
        <!-- Add your customized HTML content here -->
      `;
}

function html_message_ethics_final_approval(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, the application: ${application_id} has been finally approved </h3>

        <p> Press the button if you want to be transfered to your dashboard. </p>
        <a href="http://localhost:3000/dashboard"> Check dashboard </a>

      `;
}


function html_message_applicant_ethics_final_approval(recepient_name, status, user_role, application_id) {
  return `
        <h3> Hello ${recepient_name}, your application: ${application_id} has been Approved by everyone!!!</h3>
        <p> Your application status has been updated to: ${status} </p>

        <p> Press the button if you want to be transfered to MyApplications. </p>
        <a href="http://localhost:3000/ MyApplications"> Check  MyApplications </a>
        <!-- Add your customized HTML content here -->
      `;
}




// Example usage:
// send_mail('fpapa', 'pkaralis@york.citycollege.eu');
// send_mail('someone', 'other@example.com');

module.exports = send_mail;
