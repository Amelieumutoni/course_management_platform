const express = require('express');
const router = express.Router();
const courseoffering = require('../models/courseoffering');
const authenticateToken = require('../middleware/auth');      // Your JWT auth middleware
const authorizeRoles = require('../middleware/role'); 
const CourseOffering = require('../models/courseoffering');
         // Middleware to authorize roles like 'manager'

/**
 * @swagger
 * tags:
 *   name: CourseOfferings
 *   description: API endpoints for managing course offerings
 */

/**
 * @swagger
 * /api/course-offerings/:
 *   post:
 *     summary: Create a new course offering (Manager only)
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trimester
 *               - intake
 *               - facilitatorId
 *               - moduleId
 *               - cohortId
 *               - classId
 *               - modeId
 *             properties:
 *               trimester:
 *                 type: string
 *                 example: Fall 2025
 *               intake:
 *                 type: string
 *                 enum: [HT1, HT2, FT]
 *                 example: HT1
 *               facilitatorId:
 *                 type: integer
 *                 example: 3
 *               moduleId:
 *                 type: integer
 *                 example: 1
 *               cohortId:
 *                 type: integer
 *                 example: 1
 *               classId:
 *                 type: integer
 *                 example: 1
 *               modeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Course offering created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseOffering'
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const {
        trimester,
        intake,
        facilitatorId,
        moduleId,
        cohortId,
        classId,
        modeId
      } = req.body;

      if (
        !trimester ||
        !intake ||
        !facilitatorId ||
        !moduleId ||
        !cohortId ||
        !classId ||
        !modeId
      ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const validIntakes = ['HT1', 'HT2', 'FT'];
      if (!validIntakes.includes(intake)) {
        return res.status(400).json({ error: `Invalid intake. Allowed: ${validIntakes.join(', ')}` });
      }

      const newCourseOffering = await CourseOffering.create({
        trimester,
        intake,
        facilitatorId,
        moduleId,
        cohortId,
        classId,
        modeId
      });

      res.status(201).json(newCourseOffering);
    } catch (error) {
      console.error('Error creating course offering:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @swagger
 * /api/course-offerings/:
 *   get:
 *     summary: Get all course offerings with optional filtering
 *     tags: [CourseOfferings]
 *     parameters:
 *       - in: query
 *         name: trimester
 *         schema:
 *           type: string
 *         description: Filter by trimester
 *       - in: query
 *         name: cohortId
 *         schema:
 *           type: integer
 *         description: Filter by cohort ID
 *       - in: query
 *         name: intake
 *         schema:
 *           type: string
 *           enum: [HT1, HT2, FT]
 *         description: Filter by intake
 *       - in: query
 *         name: facilitatorId
 *         schema:
 *           type: integer
 *         description: Filter by facilitator ID
 *       - in: query
 *         name: modeId
 *         schema:
 *           type: integer
 *         description: Filter by mode ID
 *     responses:
 *       200:
 *         description: List of course offerings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseOffering'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const filter = {};
    const { trimester, cohortId, intake, facilitatorId, modeId } = req.query;

    if (trimester) filter.trimester = trimester;
    if (cohortId) filter.cohortId = cohortId;
    if (intake) filter.intake = intake;
    if (facilitatorId) filter.facilitatorId = facilitatorId;
    if (modeId) filter.modeId = modeId;

    const offerings = await CourseOffering.findAll({ where: filter });
    res.json(offerings);
  } catch (error) {
    console.error('Error fetching course offerings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /api/course-offerings/{id}:
 *   get:
 *     summary: Get course offering by ID
 *     tags: [CourseOfferings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course offering ID
 *     responses:
 *       200:
 *         description: Course offering object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseOffering'
 *       404:
 *         description: Course offering not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const offering = await CourseOffering.findByPk(req.params.id);
    if (!offering) return res.status(404).json({ error: 'Course offering not found' });
    res.json(offering);
  } catch (error) {
    console.error('Error fetching course offering:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /api/course-offerings/{id}:
 *   put:
 *     summary: Update a course offering (Manager only)
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course offering ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trimester:
 *                 type: string
 *               intake:
 *                 type: string
 *                 enum: [HT1, HT2, FT]
 *               facilitatorId:
 *                 type: integer
 *               moduleId:
 *                 type: integer
 *               cohortId:
 *                 type: integer
 *               classId:
 *                 type: integer
 *               modeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated course offering
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseOffering'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course offering not found
 *       500:
 *         description: Server error
 */
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) return res.status(404).json({ error: 'Course offering not found' });

      // Update fields from body if present
      const updateFields = [
        'trimester',
        'intake',
        'facilitatorId',
        'moduleId',
        'cohortId',
        'classId',
        'modeId'
      ];
      updateFields.forEach(field => {
        if (req.body[field] !== undefined) {
          offering[field] = req.body[field];
        }
      });

      // Optional: Validate intake enum if updated
      if (req.body.intake) {
        const validIntakes = ['HT1', 'HT2', 'FT'];
        if (!validIntakes.includes(req.body.intake)) {
          return res.status(400).json({ error: `Invalid intake. Allowed: ${validIntakes.join(', ')}` });
        }
      }

      await offering.save();
      res.json(offering);
    } catch (error) {
      console.error('Error updating course offering:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * @swagger
 * /api/course-offerings/{id}:
 *   delete:
 *     summary: Delete a course offering (Manager only)
 *     tags: [CourseOfferings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course offering ID
 *     responses:
 *       204:
 *         description: Course offering deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course offering not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) return res.status(404).json({ error: 'Course offering not found' });

      await offering.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting course offering:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
