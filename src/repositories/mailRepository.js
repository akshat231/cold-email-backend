const logger = require("../utilities/logger");
const { getPool } = require("../databases/postgres/startup");

const insertMail = async (mail, company) => {
  try {
    const pool = await getPool();
    await pool.query(
      "INSERT INTO cold_emails (email, company, created_at, last_sent) VALUES ($1, $2, NOW(), NULL)",
      [mail, company]
    );
    logger.info(`Email inserted: ${mail} for company: ${company}`);
  } catch (error) {
    logger.error(`Error inserting email (${mail}): ${error.message}`);
    throw error;
  }
};

const getRelevantMailData = async () => {
  try {
    const pool = await getPool();
    const data = await pool.query(
      `SELECT email, company 
       FROM cold_emails 
       WHERE last_sent IS NULL OR last_sent < NOW() - INTERVAL '30 days'`
    );
    return data.rows;
  } catch (error) {
    logger.error(`Error fetching relevant mail data: ${error.message}`);
    throw error;
  }
};

const updateMailData = async (successfulEmails) => {
  try {
    const pool = await getPool();
    if (successfulEmails.length > 0) {
      const params = successfulEmails.map((_, i) => `$${i + 1}`).join(", ");
      const query = `UPDATE cold_emails SET last_sent = NOW() WHERE email IN (${params})`;
      await pool.query(query, successfulEmails);
      logger.info(`Updated last_sent for ${successfulEmails.length} emails`);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { insertMail, getRelevantMailData, updateMailData };
