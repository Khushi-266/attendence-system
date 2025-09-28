import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Smart Attendance System</h2>
          <p className="text-sm mt-2">
            Streamlining attendance management for modern educational institutions.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Smart Attendance System. All rights reserved. <br />
          Created by <a href="https://www.aumtech.solutions" className="text-blue-400 font-medium" target="_blank" rel="noopener noreferrer">
            Aum Tech Solutions
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
