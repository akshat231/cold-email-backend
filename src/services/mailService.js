const logger = require("../utilities/logger");
const nodemailer = require("nodemailer");
const { mailRepository } = require("../repositories");
require("dotenv").config();
const path = require('path')
const pdfPath = path.resolve(__dirname, '../../public/Akshat Sharma.pdf');

const transporter = nodemailer.createTransport({
  service: "Gmail", // or 'SendGrid', 'Mailgun', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // App password or real password
  },
});

const insertMail = async (mail, company) => {
  try {
    await mailRepository.insertMail(mail, company);
    return {
      message: "Mail is inserted successfully",
      data: { email: mail, companyName: company },
    };
  } catch (error) {
    throw error;
  }
};

const generateColdEmailBody = (company) => {
  try {
    return `
Hi,

Hope you are doing well.

I came across your profile and learned that you’re hiring for roles at ${company}, so I'm reaching out to you regarding Software development Engineer opportunities at ${company}. I graduated from NIT Hamirpur with a degree in Computer Science and Engineering and have two years of experience as a Software Engineer at SearchUnify. 


My technical expertise spans programming languages like C++, Python, JavaScript, and Dart, alongside frameworks such as ReactJS, Flutter, Node.js, Express, and React Native. I’m proficient with databases including  MongoDB, Postgres, Elastic and have worked in AI Domain. have strong knowledge of full-stack development, Agentic AI and app development and docker.

I believe my skills can add value to ${company}’s engineering efforts. If you have any relevant openings,  I’d be happy to discuss how I can contribute.

My resume is attached for your consideration.

Thanks,  
Akshat Sharma
+91-9418104975
    `;
  } catch (error) {
    throw new Error(`Failed to generate email body: ${error.message}`);
  }
};

const sendEmail = async (toEmail, body, company) => {
  try {
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to: toEmail, // Recipient
      subject: `Software Development Engineer Application at ${company}`, // Customize subject
      text: body, // Plain text body
      attachments: pdfPath
        ? [
            {
              filename: path.basename(pdfPath),
              path: pdfPath,
              contentType: "application/pdf",
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${toEmail}: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${toEmail}: ${error.message}`);
    throw error;
  }
};

const sendColdMails = async () => {
  try {
    const mailData = await mailRepository.getRelevantMailData();
    const successfulEmails = [];
    await Promise.all(
      mailData.map(async (mail) => {
        try {
          const mailBody = generateColdEmailBody(mail.company);

          // Send the email
          await sendEmail(mail.email, mailBody);
          logger.info(`Email sent to ${mail.email}`);

          // Collect email for bulk update
          successfulEmails.push(mail.email);
        } catch (error) {
          logger.error(`Failed to send to ${mail.email}: ${error.message}`);
          // Do not include in update if send failed
        }
      })
    );
    await mailRepository.updateMailData(successfulEmails);
    return;
  } catch (error) {
    logger.error(`Error in sending cold mails: ${error}`);
    throw error;
  }
};

module.exports = {
  insertMail,
  sendColdMails,
};
