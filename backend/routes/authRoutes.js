const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @route   POST /api/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check duplicate email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create student (password hashed via pre-save hook)
    const student = await Student.create({ name, email, password });

    res.status(201).json({
      message: 'Registration successful',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
      },
      token: generateToken(student._id),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   POST /api/login
// @desc    Login student
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const student = await Student.findOne({ email });

    if (!student || !(await student.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
      },
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
