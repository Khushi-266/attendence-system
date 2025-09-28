const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const getFilePath = (className) => path.join(__dirname, '..', 'uploads', `${className}.xlsx`);

const createClassExcel = async (className) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Attendance');
  sheet.addRow(['Roll No', 'Name', 'Father Name']);
  await workbook.xlsx.writeFile(getFilePath(className));
};

const addStudentToExcel = async (className, student) => {
  const workbook = new ExcelJS.Workbook();
  const filePath = getFilePath(className);
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet('Attendance');
  sheet.addRow([student.rollNo, student.name, student.fatherName]);
  await workbook.xlsx.writeFile(filePath);
};

const markAttendance = async (className, rollNo) => {
  const workbook = new ExcelJS.Workbook();
  const filePath = getFilePath(className);
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet('Attendance');

  const today = new Date().toLocaleDateString();
  const headerRow = sheet.getRow(1);
  let dateCol = headerRow.values.indexOf(today);
  if (dateCol === -1) {
    headerRow.values.push(today);
    headerRow.commit();
    dateCol = headerRow.cellCount;
  }

  sheet.eachRow((row, rowNum) => {
    if (rowNum === 1) return;
    if (row.getCell(1).value == rollNo) {
      row.getCell(dateCol).value = '✔️';
      row.commit();
    }
  });

  await workbook.xlsx.writeFile(filePath);
};

module.exports = {
  createClassExcel,
  addStudentToExcel,
  markAttendance,
};
