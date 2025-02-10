import nodemailer from "nodemailer";
import { google } from "googleapis";
const CLIENT_ID = process.env.OAUTH_CLIENTID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
export const sendEmail = async (library_name, fname, lname, email, role, password) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        if (!accessToken) {
            throw new Error("Failed to generate access token for email service.");
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token || "",
            },
        });
        const mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: "Your Unique Code",
            text: `Congrats on being selected as an ${role}.`,
            html: `<head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          h1 {
            color: #333;
          }
          p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
          }
          .highlight {
            color: #d9534f;
            font-weight: bold;
          }
          .role {
            color: #f39c12;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📜 Membership Letter - Welcome to ${library_name} 📜</h1>
          <p>Dear <strong>${fname} ${lname}</strong>,</p>

          <p>We are pleased to offer you the position of <span class="role">${role}</span> at <strong>${library_name}</strong>. Congratulations on your selection! 🎉</p>

          <p>Your login credentials are as follows:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> <span class="highlight">${password}</span></p>

          <p>If you have any questions, feel free to reach out to us.</p>

          <p>Welcome aboard! We look forward to working with you. 📚</p>

          <div class="footer">
            <p>Best Regards,</p>
            <p><strong>${library_name} Team</strong></p>
          </div>
        </div>
      </body>`,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email.");
    }
};
