const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require("dotenv").config();
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
OAuth2_client.setCredentials( {refresh_token : process.env.REFRESH_TOKEN})

export function send_mail(name, recipient) {
    const accessToken = OAuth2_client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'Oauth2',
            user: process.env.USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        } 
    })

    const mail_options = {
        from: 'FPapa <${process.env.USER}>',
        to: recipient,
        subject: 'A Message from FPapa',
        html: get_html_message(name)
    }

    transport.sendMail(mail_options, function(error, result){
        if (error) {
            console.log('Error: ', error)
        } else {
            console.log('Success: ', result)
        }
        transport.close()


    })
}

function get_html_message(name) {
    return `
        <h3> ${name}! This is a test </h3>

    `
}

send_mail('fpapa', 'pkaralis@york.citycollege.eu')