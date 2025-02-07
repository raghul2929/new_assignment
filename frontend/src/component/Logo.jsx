import React from "react";

const Logo = () => {
  return (
    <div className="w-16 h-16 flex items-center justify-center bg-purple-900 rounded">
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Box */}
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="white" strokeWidth="5" fill="none" />
        
        {/* Inner Details */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="5" />
        <line x1="10" y1="30" x2="50" y2="50" stroke="white" strokeWidth="5" />
        <line x1="90" y1="30" x2="50" y2="50" stroke="white" strokeWidth="5" />
      </svg>
    </div>
  );
};

export default Logo;
