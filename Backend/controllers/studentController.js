const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

exports.studentSignup = async (req, res) => {
  try {
    console.log('✅ Signup route hit');

    const { name, rollNo, fatherName, className, password } = req.body;
    console.log('Received data:', { name, rollNo, fatherName, className, password });

    if (!name || !rollNo || !fatherName || !className || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      console.log('❌ Student already exists');
      return res.status(400).json({ error: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔐 Password hashed');

    const student = new Student({
      name,
      rollNo,
      fatherName,
      className,
      password: hashedPassword,
    });

    await student.save();
    console.log('📦 Student saved to MongoDB');

    // Excel File Work
    const workbook = new ExcelJS.Workbook();
    const classFilePath = path.join(__dirname, `../data/${className}.xlsx`);

    let worksheet;

    if (fs.existsSync(classFilePath)) {
      console.log('📄 Excel file exists, loading...');
      await workbook.xlsx.readFile(classFilePath);
      worksheet = workbook.getWorksheet('Attendance');
    } else {
      console.log('📄 Creating new Excel file...');
      worksheet = workbook.addWorksheet('Attendance');
      worksheet.columns = [
        { header: 'Roll No', key: 'rollNo', width: 15 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Father Name', key: 'fatherName', width: 30 },
      ];
    }

    worksheet.addRow({
      rollNo,
      name,
      fatherName,
    });

    await workbook.xlsx.writeFile(classFilePath);
    console.log('✅ Excel file written:', classFilePath);

    res.status(201).json({ student });
  } catch (error) {
    console.error('❌ Signup Error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

exports.studentLogin = async (req, res) => {
  // Temporary placeholder
  res.status(200).json({ message: 'Login route working' });
};

exports.markAttendance = async (req, res) => {
  // Temporary placeholder
  res.status(200).json({ message: 'Mark attendance route working' });
};
