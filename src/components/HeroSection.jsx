import React from 'react';

export function HeroSection() {
  return (
    <div className="w-full px-4 flex items-center justify-center relative z-10" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight whitespace-nowrap">
          Your smart AI assistant with{' '}
          <span className="text-5xl md:text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Nasalization, sans-serif' }}>
            DAGGPT
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          DAGGPT generates high-converting contents with AI, helping you get the most out of Ai Models.
        </p>
      </div>
    </div>
  );
}
