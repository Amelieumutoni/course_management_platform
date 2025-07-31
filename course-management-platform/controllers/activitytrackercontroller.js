const ActivityTracker = require('../models/activitytracker');
const publishNotification = require('../utils/redispublisher');

// CREATE log
exports.createLog = async (req, res) => {
  try {
    const newLog = await ActivityTracker.create({ ...req.body });

    // ✅ Publish notification to Redis
    await publishNotification(
      'manager-alerts',
      `Facilitator ${req.user.name || req.user.id} submitted log for Week ${req.body.week}`
    );

    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET logs for a facilitator
const CourseOffering = require('../models/courseoffering'); // make sure this is imported at the top

exports.getFacilitatorLogs = async (req, res) => {
  try {
    const logs = await ActivityTracker.findAll({
      include: [{
        model: CourseOffering,
        where: { facilitatorId: req.user.id }
      }]
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE log
exports.updateLog = async (req, res) => {
  try {
    const log = await ActivityTracker.findByPk(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });

    // Optional: Check if the logged-in user is the owner
    await log.update(req.body);
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all logs for managers
exports.getAllLogs = async (req, res) => {
  try {
    const filters = {};
    if (req.query.week) filters.week = req.query.week;
    if (req.query.allocationId) filters.allocationId = req.query.allocationId;
    // Allow filtering by any status field
    const statusFields = [
      'formativeOneGrading',
      'formativeTwoGrading',
      'summativeGrading',
      'courseModeration',
      'intranetSync',
      'gradeBookStatus'
    ];
    statusFields.forEach(field => {
      if (req.query[field]) filters[field] = req.query[field];
    });
    const logs = await ActivityTracker.findAll({ where: filters });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
