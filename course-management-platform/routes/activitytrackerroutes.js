const express = require('express');
const router = express.Router();
const controller = require('../controllers/activitytrackercontroller');
const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

/**
 * @swagger
 * /api/activitylogs/:
 *   post:
 *     summary: Facilitator creates a new activity log
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Activity log created
 *       500:
 *         description: Server error
 */
router.post('/', authenticateToken, authorizeRoles('facilitator'), controller.createLog);

/**
 * @swagger
 * /api/activitylogs/:
 *   get:
 *     summary: Facilitator gets their activity logs
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activity logs
 *       500:
 *         description: Server error
 */
router.get('/', authenticateToken, authorizeRoles('facilitator'), controller.getFacilitatorLogs);

/**
 * @swagger
 * /api/activitylogs/{id}:
 *   put:
 *     summary: Facilitator updates an activity log
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Activity log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated activity log
 *       404:
 *         description: Activity log not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authenticateToken, authorizeRoles('facilitator'), controller.updateLog);

/**
 * @swagger
 * /api/activitylogs/all:
 *   get:
 *     summary: Manager gets all activity logs
 *     tags: [ActivityTracker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all activity logs
 *       500:
 *         description: Server error
 */
router.get('/all', authenticateToken, authorizeRoles('manager'), controller.getAllLogs);

module.exports = router;