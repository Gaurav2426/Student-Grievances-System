const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// @route   GET /api/grievances/search?title=xyz
// @desc    Search grievances by title (must be before /:id)
// @access  Private
router.get('/search', async (req, res) => {
  try {
    const { title, category, status } = req.query;

    const query = { student: req.student._id };

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }

    const grievances = await Grievance.find(query).sort({ createdAt: -1 });

    res.json({
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   POST /api/grievances
// @desc    Submit a new grievance
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please provide title, description, and category' });
    }

    const grievance = await Grievance.create({
      title,
      description,
      category,
      student: req.student._id,
    });

    res.status(201).json({
      message: 'Grievance submitted successfully',
      grievance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   GET /api/grievances
// @desc    Get all grievances for logged-in student
// @access  Private
router.get('/', async (req, res) => {
  try {
    const grievances = await Grievance.find({ student: req.student._id }).sort({
      createdAt: -1,
    });

    res.json({
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   GET /api/grievances/:id
// @desc    Get grievance by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      student: req.student._id,
    });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json(grievance);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   PUT /api/grievances/:id
// @desc    Update a grievance
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const grievance = await Grievance.findOne({
      _id: req.params.id,
      student: req.student._id,
    });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    if (title) grievance.title = title;
    if (description) grievance.description = description;
    if (category) grievance.category = category;
    if (status) grievance.status = status;

    const updatedGrievance = await grievance.save();

    res.json({
      message: 'Grievance updated successfully',
      grievance: updatedGrievance,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   DELETE /api/grievances/:id
// @desc    Delete a grievance
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const grievance = await Grievance.findOneAndDelete({
      _id: req.params.id,
      student: req.student._id,
    });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json({ message: 'Grievance deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
