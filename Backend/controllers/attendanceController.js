const AttendanceCode = require('../models/AttendanceCode');
const { markAttendance } = require('../utils/excelUtils');

exports.generateCode = async (req, res) => {
  const { className } = req.body;
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const newCode = new AttendanceCode({ className, code, expiresAt });
  await newCode.save();
  res.status(201).json({ code, expiresAt });
};

exports.markAttendanceByCode = async (req, res) => {
  const { rollNo, code } = req.body;
  const entry = await AttendanceCode.findOne({ code });

  if (!entry || new Date() > new Date(entry.expiresAt)) {
    return res.status(400).json({ message: 'Invalid or expired code.' });
  }

  await markAttendance(entry.className, rollNo);
  res.status(200).json({ message: 'Attendance marked successfully.' });
};
