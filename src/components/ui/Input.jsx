import React from 'react';

export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors ${className}`}
      {...props}
    />
  );
}