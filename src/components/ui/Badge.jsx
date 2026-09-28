import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";

  const variants = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",  // للتطبيق المكتمل / Done
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",      // للـ In Progress / أولوية متوسطة
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/20",          // للـ Urgent / أولوية عالية
    info: "bg-sky-500/10 text-sky-400 border-sky-500/20"                // للـ Backlog / To Do
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}