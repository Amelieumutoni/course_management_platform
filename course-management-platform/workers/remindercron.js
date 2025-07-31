const cron = require('node-cron');
const sequelize = require('../config/db');
const User = require('../models/user');
const CourseOffering = require('../models/courseoffering');
const ActivityTracker = require('../models/activitytracker');
const publishNotification = require('../utils/redispublisher');

// Helper to get current week number (ISO week)
function getCurrentWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60000) / 86400000;
  return Math.ceil((diff + start.getDay() + 1) / 7);
}

// Main scheduled job
cron.schedule('0 8 * * 1', async () => {
  console.log('⏰ Running facilitator reminder job...');
  try {
    await sequelize.authenticate();
    // Get all facilitators
    const facilitators = await User.findAll({ where: { role: 'facilitator' } });
    const week = getCurrentWeekNumber();
    for (const facilitator of facilitators) {
      // Get all course offerings assigned to this facilitator
      const offerings = await CourseOffering.findAll({ where: { facilitatorId: facilitator.id } });
      for (const offering of offerings) {
        // Check if a log exists for this week
        const log = await ActivityTracker.findOne({ where: { allocationId: offering.id, week } });
        if (!log) {
          // Publish reminder notification
          const message = `Reminder: Please submit your activity log for week ${week} (CourseOffering ID: ${offering.id})`;
          await publishNotification('facilitator-reminders', JSON.stringify({ facilitatorId: facilitator.id, message }));
          console.log(`🔔 Reminder sent to facilitator ${facilitator.id} for offering ${offering.id}`);
        }
      }
    }
  } catch (err) {
    console.error('Reminder job error:', err);
  }
});

console.log('🟢 Reminder cron job scheduled (every Monday 8am)'); 