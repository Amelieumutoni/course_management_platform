const redis = require('redis');
const subscriber = redis.createClient();

subscriber.on('error', (err) => {
  console.error('Redis Subscriber Error:', err);
});

(async () => {
  await subscriber.connect();
  console.log('🟢 Redis Worker Listening...');

  await subscriber.subscribe('manager-alerts', (message) => {
    console.log('🔔 Manager Alert:', message);
    // In a real system: send email, dashboard notification, etc.
  });

  // Subscribe to facilitator reminders
  await subscriber.subscribe('facilitator-reminders', (message) => {
    const data = JSON.parse(message);
    console.log('📧 Facilitator Reminder:', data.message, `(Facilitator ID: ${data.facilitatorId})`);
    // In a real system: send email, SMS, or dashboard notification to facilitator
  });
})();
