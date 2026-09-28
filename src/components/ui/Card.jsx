import React from 'react';

export default function Card({ children, className = '', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 shadow-sm transition-all hover:border-zinc-700/80 ${onClick ? 'cursor-pointer hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </div>
  );
}