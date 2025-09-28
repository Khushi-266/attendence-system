const express = require('express');
const router = express.Router();
const { generateCode, markAttendanceByCode } = require('../controllers/attendanceController');

router.post('/code', generateCode);
router.post('/mark', markAttendanceByCode);

module.exports = router;
