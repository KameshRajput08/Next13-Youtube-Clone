import React from "react";

const Button = ({ text, type, onClick, disabled, size }) => {
  return (
    <button
      type={type}
      className={`w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg
      ${size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-3 mt-6'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
