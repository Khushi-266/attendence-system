import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaUserCircle } from 'react-icons/fa';

const TeacherPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState('takeAttendance');
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceCode, setAttendanceCode] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  // Handle countdown
  useEffect(() => {
    if (expiryTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
        setTimeLeft(diff);

        if (diff <= 0) {
          setAttendanceCode(null);
          setExpiryTime(null);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expiryTime]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setTeacher({ name: 'John Doe', email });
    setIsAuthenticated(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    setTeacher({ name, email });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTeacher(null);
    setActiveTab('takeAttendance');
  };

  const generateCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000); // 5-digit code
    const expiry = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 min from now
    setAttendanceCode(code);
    setExpiryTime(expiry);
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'takeAttendance':
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Take Attendance</h2>
            {classes.length === 0 ? (
              <p className="text-gray-600">No classes found. Please add classes in the "Manage Classes" tab.</p>
            ) : (
              <ul className="space-y-3">
                {classes.map((className, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm"
                  >
                    <span className="font-medium text-gray-800">{className}</span>
                    <button
                      onClick={() => {
                        setSelectedClass(className);
                        setShowModal(true);
                        setAttendanceCode(null);
                        setExpiryTime(null);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Take Attendance
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'viewReports':
        return <p className="text-gray-700">📊 Attendance reports will be shown here...</p>;

      case 'manageClasses':
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📘 Manage Classes</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter class name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="px-4 py-2 border rounded w-full focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={() => {
                  if (newClassName.trim()) {
                    setClasses([...classes, newClassName.trim()]);
                    setNewClassName('');
                  }
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Class
              </button>
            </div>

            {classes.length === 0 ? (
              <p className="text-gray-600">No classes yet. Add your first class above.</p>
            ) : (
              <ul className="space-y-3">
                {classes.map((className, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded shadow-sm"
                  >
                    <span className="text-gray-800 font-medium">{className}</span>
                    <button
                      onClick={() =>
                        setClasses(classes.filter((_, i) => i !== index))
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Unauthenticated UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            {isSignUp ? 'Sign Up' : 'Login'}
          </h2>

          <form onSubmit={isSignUp ? handleSignup : handleLogin} className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSignUp ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:underline font-medium"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard UI
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-blue-700">
          <FaChalkboardTeacher className="text-3xl" />
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      {/* Profile Section */}
      <section className="bg-white mx-6 mt-6 rounded-lg shadow-md p-6 flex items-center gap-4">
        <FaUserCircle className="text-5xl text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{teacher.name}</h2>
          <p className="text-gray-600">{teacher.email}</p>
        </div>
      </section>

      {/* Nav Tabs */}
      <nav className="bg-white mt-4 mx-6 shadow p-4 rounded-lg flex flex-wrap gap-4">
        {[
          { key: 'takeAttendance', label: 'Take Attendance' },
          { key: 'viewReports', label: 'View Reports' },
          { key: 'manageClasses', label: 'Manage Classes' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded transition font-medium ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="bg-white mx-6 my-6 p-6 rounded-lg shadow-md">
        {renderDashboardContent()}
      </main>

      {/* Modal for Attendance Code */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Take Attendance - {selectedClass}
            </h2>
            <p className="text-gray-700 mb-4">
              To take attendance, generate a code. This code will be valid for 10 minutes.
            </p>
            {attendanceCode ? (
              <div className="mb-4">
                <p className="text-lg font-bold text-blue-700">
                  Code: {attendanceCode}
                </p>
                <p className="text-sm text-gray-600">
                  Expires in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
                </p>
              </div>
            ) : (
              <button
                onClick={generateCode}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
              >
                Generate Code
              </button>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-600 hover:underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
