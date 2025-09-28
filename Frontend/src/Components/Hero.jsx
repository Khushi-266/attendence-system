import React from 'react';
import DarkVeil from '../reactbits/DarkVeil';

function Hero() {
  return (
    <div id="home" className="relative w-full h-[600px] bg-black overflow-hidden">
      {/* Dark Veil Effect */}
      <DarkVeil className="absolute inset-0 z-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-2">
        <h1 className=" text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Smart Attendance System
        </h1>
        <p className="text-gray-200 text-lg sm:text-xl md:text-2xl mb-6 max-w-3xl">
          Effortlessly track student attendance in real-time.  
          <br />
          Fast, reliable, and built for modern classrooms.
        </p>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
          Empowering institutions with automation and accuracy.
        </p>
      </div>
    </div>
  );
}

export default Hero;
