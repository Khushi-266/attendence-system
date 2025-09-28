const Class = require('../models/Class');
const { createClassExcel } = require('../utils/excelUtils');

exports.createClass = async (req, res) => {
  const { name } = req.body;
  try {
    const newClass = new Class({ name });
    await newClass.save();
    await createClassExcel(name);
    res.status(201).json({ message: 'Class created and Excel file initialized.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
