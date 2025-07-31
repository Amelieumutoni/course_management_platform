const redis = require('redis');
const publisher = redis.createClient();

publisher.on('error', (err) => {
  console.error('Redis Publisher Error:', err);
});

const publishNotification = async (channel, message) => {
  await publisher.connect();
  await publisher.publish(channel, message);
  console.log(`📢 Published on ${channel}:`, message);
  await publisher.disconnect();
};

module.exports = publishNotification;
