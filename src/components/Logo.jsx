import React from 'react';
import logo from '../assets/DAGGPT-01.png';

export function Logo() {
  return (
    <div className="flex items-center">
      <img 
        src={logo} 
        alt="DAG GPT" 
        className="h-10 w-auto"
      />
    </div>
  );
}
