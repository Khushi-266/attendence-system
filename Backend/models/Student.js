const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  fatherName: { type: String, required: true },
  className: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
