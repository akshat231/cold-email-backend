const cron = require('node-cron');
const { mailService } = require('../services');
const logger = require('../utilities/logger');

// Schedule to run at 8:00 AM every day
cron.schedule('0 8 * * *', async () => {
  logger.info('Starting daily cold email job...');

  try {
    await mailService.sendColdMails();
    logger.info('Daily cold email job completed successfully.');
  } catch (error) {
    logger.error(`Cold email job failed: ${error.message}`);
  }
}, {
  timezone: 'UTC' // Set to your timezone, e.g., 'America/New_York'
});
