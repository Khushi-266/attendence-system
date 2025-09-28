import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 w-full z-50 bg-gray/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex flex-wrap p-4 flex-row items-center justify-between">
        {/* Logo */}
        <a className="flex items-center text-gray-900">
          <span className="ml-2 text-2xl font-extrabold tracking-tight">
            <span className="text-amber-300">Attendance</span>
            <span className="text-fuchsia-400">System</span>
          </span>
        </a>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl text-white hover:text-blue-600 transition"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu */}
        <nav
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8 text-lg font-medium transition-all duration-300`}
        >
          {['Dashboard', 'Teacher', ' Student', 'Settings'].map((item) => (
  <a
    key={item}
    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
    className="cursor-pointer text-white relative group"
  >
    {item}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
  </a>
))}

          
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
