import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Background overlay or image can be added here */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 z-0"></div>
      
      <div className="relative z-10 text-center px-4">
       
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-2 text-gray-900">
          MENS
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-gray-700 mb-6">
          Fall-Winter 2025
        </p>
        
        <h3 className="px-6 py-2 md:px-8 md:py-3 bg-black text-white uppercase tracking-wider text-sm md:text-base hover:bg-gray-800 transition-colors duration-300">
          Discover the Collection <br />
          UNIQUENESS
        </h3>
      </div>
    </div>
  );
};

export default Hero;