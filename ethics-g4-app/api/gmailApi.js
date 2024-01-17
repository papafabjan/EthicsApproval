const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


function send_mail(recepient_name, recepient_email, status, user_role) {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "Oauth2",
      user: process.env.USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailOptions;

  if (status) {
    mailOptions = {
      from: "ethicsTeam <${process.env.USER}>",
      to: recepient_email,
      subject: "Application status has been updated",
      html: get_html_message_for_applicant(recepient_name),
    };
  } else {
    // Default template for other recipients
    mailOptions = {
      from: "ethicsTeam <${process.env.USER}>",
      to: recepient_email,
      subject: "Application status has been updated",
      html: get_html_message_for_staff_members(recepient_name),
    };
  }

  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
}

function get_html_message_for_applicant(recepient_name) {
  return `
        <h3> ${recepient_name}! Your application has been approved by "user.role"</h3>
        <p> Your application status has been updated to: ${Status} </p>
        <button id="checkApplicationsButton">Check Applications</button>

        <script>
        // Add an event listener to the button
        document.getElementById('checkApplicationsButton').addEventListener('click', function() {
            console.log('Button clicked!');
            window.location.href = '../client/src/pages/Dashboard.jsx';
          });
        </script>
        <!-- Add your customized HTML content here -->
      `;
}

function get_html_message_for_staff_members(recepient_name) {
  return `
        <h3> ${recepient_name}! The application has been approved by "user.role" </h3>
        <p> The next step is for <strong>you</strong> to approve it! </p>

        <p> Press the button if you want to be transfered to your dashboard. </p>
        <a href="http://localhost:3000/dashboard"> Check dashboard </a>


      `;
}

// Example usage:
// send_mail('fpapa', 'pkaralis@york.citycollege.eu');
// send_mail('someone', 'other@example.com');

module.exports = send_mail;
