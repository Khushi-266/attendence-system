import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaChartBar, FaUserGraduate, FaBell, FaShieldAlt } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut'
    }
  })
};

function Features() {
  const features = [
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Real-Time Attendance",
      desc: "Record and track attendance instantly via QR codes or biometric systems.",
      delay: 0.1
    },
    {
      icon: <FaChartBar className="w-6 h-6" />,
      title: "Admin Dashboard",
      desc: "Powerful control panel to manage classes, students, and reports with ease.",
      delay: 0.2
    },
    {
      icon: <FaUserGraduate className="w-6 h-6" />,
      title: "Student Portal",
      desc: "Students can view attendance logs, class schedules, and receive alerts.",
      delay: 0.3
    },
    {
      icon: <FaBell className="w-6 h-6" />,
      title: "Smart Notifications",
      desc: "Get alerts for late arrivals, absences, or class-specific updates.",
      delay: 0.4
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Secure & Reliable",
      desc: "All data is securely encrypted and stored with robust access control.",
      delay: 0.5
    },
  ];

  return (
    <section className="text-gray-800 body-font bg-gradient-to-br from-white to-purple-100" id="features">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

        <div className="w-full mb-12 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Why Choose Smart Attendance System?
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
          >
            Discover how our intelligent, secure, and user-friendly platform transforms attendance tracking into a seamless experience for administrators, teachers, and students alike.
          </motion.p>
        </div>


        {/* Left Side Image */}
        <motion.div
          className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <img
            alt="attendance feature"
            className="object-cover object-center  h-full w-full rounded-lg"
            src="images/attendance.jpg"
          />
        </motion.div>

        {/* Features Grid */}
        <div className="flex flex-col lg:w-1/2 lg:pl-12 lg:text-left text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col mb-8 lg:items-start items-center hover:bg-white hover:shadow-md p-5 rounded-xl transition duration-300 border border-gray-200"
              custom={feature.delay}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 text-lg">
                {feature.icon}
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
