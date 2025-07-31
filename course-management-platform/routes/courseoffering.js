const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

const CourseOffering = require('../models/courseoffering');

// CREATE
router.post(
  '/',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const newOffering = await CourseOffering.create(req.body);
      res.status(201).json(newOffering);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

//  READ ALL
router.get(
  '/',
  authenticateToken,
  authorizeRoles('manager', 'facilitator'),
  async (req, res) => {
    try {
      const offerings = await CourseOffering.findAll();
      res.json(offerings);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// READ ONE BY ID
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('manager', 'facilitator'),
  async (req, res) => {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) {
        return res.status(404).json({ message: 'Course offering not found' });
      }
      res.json(offering);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// UPDATE
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) {
        return res.status(404).json({ message: 'Course offering not found' });
      }
      await offering.update(req.body);
      res.json(offering);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// DELETE
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('manager'),
  async (req, res) => {
    try {
      const offering = await CourseOffering.findByPk(req.params.id);
      if (!offering) {
        return res.status(404).json({ message: 'Course offering not found' });
      }
      await offering.destroy();
      res.json({ message: 'Course offering deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

module.exports = router;
