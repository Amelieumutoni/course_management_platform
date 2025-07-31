const express = require('express');
const router = express.Router();
const controller = require('../controllers/activitytrackercontroller');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

// Facilitator routes
router.post('/', authenticateToken, authorizeRoles('facilitator'), controller.createLog);
router.get('/', authenticateToken, authorizeRoles('facilitator'), controller.getFacilitatorLogs);
router.put('/:id', authenticateToken, authorizeRoles('facilitator'), controller.updateLog);

// Manager route
router.get('/all', authenticateToken, authorizeRoles('manager'), controller.getAllLogs);

module.exports = router;
