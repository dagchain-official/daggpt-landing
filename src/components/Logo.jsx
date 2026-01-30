import React from 'react';
import mainLogo from '../assets/DAGGPT-01.png';

export function Logo() {
  return (
      <div className="flex items-center">
        <img 
          src={mainLogo} 
          alt="DAG GPT" 
          className="h-10 w-auto object-contain"
        />
      </div>
  );
}
