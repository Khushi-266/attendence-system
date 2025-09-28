const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  className: String,
  code: String,
  expiresAt: Date,
});

module.exports = mongoose.model('AttendanceCode', codeSchema);
