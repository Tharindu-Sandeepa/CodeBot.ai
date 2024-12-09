import React, { useState } from 'react';


const MagicButton = ({ onClick, label }) => {
  const [stars] = useState(Array.from({ length: 8 })); 

  return (
    <button
      className="magic-button"
      onClick={onClick}
      style={{
        padding: '10px 70px', 
        fontSize: '16px', 
        borderRadius: '8px', 
        position: 'relative', 
        overflow: 'hidden', 
      }}
    >
      {label}
      <div className="stars">
        {stars.map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default MagicButton;