import React, { useState } from 'react';

const StudentPanel = () => {
  const [student, setStudent] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const rollNo = form.rollNo.value;
    const password = form.password.value;

    // Simply create a student object without backend calls
    setStudent({
      name: 'Student', // no name input on login, default placeholder
      rollNo,
      fatherName: 'N/A',
      className: 'N/A',
      password,
    });
    setMessage('✅ Logged in successfully!');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const rollNo = form.rollNo.value;
    const fatherName = form.fatherName.value;
    const className = form.className.value;
    const password = form.password.value;

    setStudent({
      name,
      rollNo,
      fatherName,
      className,
      password,
    });
    setMessage('✅ Signup successful!');
  };

  const handleLogout = () => {
    setStudent(null);
    setMessage('');
    setAttendanceCode('');
  };

  const handleMarkAttendance = (e) => {
    e.preventDefault();
    if (!student) return;
    if (!attendanceCode.trim()) {
      setMessage('❌ Please enter an attendance code.');
      return;
    }
    setMessage(`✅ Attendance marked for code: ${attendanceCode}`);
    setAttendanceCode('');
  };

  if (!student) {
    // Show login/signup forms like TeacherPanel does
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            {isSignUp ? 'Sign Up' : 'Login'}
          </h2>

          <form onSubmit={isSignUp ? handleSignup : handleLogin} className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <input
                  type="text"
                  name="fatherName"
                  placeholder="Father's Name"
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <input
                  type="text"
                  name="className"
                  placeholder="Class Name"
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </>
            )}

            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {isSignUp ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-600 hover:underline font-medium"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>

          {message && (
            <p className="mt-4 text-center text-sm text-green-700">{message}</p>
          )}
        </div>
      </div>
    );
  }

  // Student logged in UI
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-green-700 mb-4">
          Welcome, {student.name}!
        </h2>

        <form onSubmit={handleMarkAttendance} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Attendance Code"
            value={attendanceCode}
            onChange={(e) => setAttendanceCode(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Mark Attendance
          </button>
        </form>

        <div className="mt-6 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p><strong>Roll No:</strong> {student.rollNo}</p>
          <p><strong>Father's Name:</strong> {student.fatherName}</p>
          <p><strong>Class:</strong> {student.className}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default StudentPanel;
