import React from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: 'easeOut'
    }
  }),
};

function GetStarted() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white text-gray-800" id="getstarted">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Get Started with Smart Attendance System
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          Choose your role to access the personalized dashboard and tools.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <motion.div
            className="w-full md:w-1/3 bg-blue-50 rounded-xl p-8 hover:shadow-xl transition duration-300 border border-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
          >
            <FaChalkboardTeacher className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">I'm a Teacher</h3>
            <p className="text-gray-600 mb-4">
              Manage classes, track student attendance, and access reports easily.
            </p>
            <button
              onClick={() => navigate('/teacher')}
              className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Teacher Portal
            </button>
          </motion.div>

          <motion.div
            className="w-full md:w-1/3 bg-green-50 rounded-xl p-8 hover:shadow-xl transition duration-300 border border-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.3}
          >
            <FaUserGraduate className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">I'm a Student</h3>
            <p className="text-gray-600 mb-4">
              View your attendance history, class schedules, and receive notifications.
            </p>
            <button
              onClick={() => navigate('/student')}
              className="inline-block px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Student Portal
            </button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
