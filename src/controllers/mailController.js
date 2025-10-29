const logger = require("../utilities/logger");
const { mailService } = require("../services");

const insertMail = async (mail, company) => {
  try {
    const result = await mailService.insertMail(mail, company);
    return result;
  } catch (error) {
    throw error;
  }
};

const sendColdMails = async() => {
  try {
    await mailService.sendColdMails();
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertMail,
  sendColdMails,
};
