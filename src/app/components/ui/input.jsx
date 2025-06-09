'use client';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}