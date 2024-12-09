import React, { useState } from 'react';

const BigButton = ({ onClick, label }) => {
  const [stars] = useState(Array.from({ length: 5 })); // More stars for animation

  return (
    <button
      className="relative flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 ease-out"
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      <span className="flex items-center gap-3">
        {/* Magic wand icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 animate-pulse"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487l.894-2.68m3.064 6.21l2.363-1.781M5.23 9.534l2.363 1.781m6.46 10.217l-2.363 1.782M2.268 7.74l2.107-1.587M11.132 2.2l1.381-2.118M19.855 16.144l2.18 1.645"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.75 14.75l-8.5 8.5m9.536-10.607l3.536 3.536M9.535 3.465L3.465 9.535"
          />
        </svg>
        {label}
      </span>

      {/* Star animations */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((_, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 8 + 4}px`, // Random star size between 4-12px
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `sparkle ${Math.random() * 1.5 + 1}s linear infinite`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) translateY(-10px);
            opacity: 0.6;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .big-button:hover .wand {
          animation: wand-spin 0.6s ease-in-out;
        }

        @keyframes wand-spin {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(15deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </button>
  );
};

export default BigButton;
