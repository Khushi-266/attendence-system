const express = require('express');
const router = express.Router();

const {
  studentSignup,
  studentLogin,
  markAttendance,
} = require('../controllers/studentController');

router.post('/signup', studentSignup);
router.post('/login', studentLogin);
router.post('/mark-attendance', markAttendance);

module.exports = router;
