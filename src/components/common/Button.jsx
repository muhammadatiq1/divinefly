import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  type = 'button', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  
  // 1. Base Styles (Layout, Font, Transition)
  const baseStyle = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap";
  
  // 2. Variants (Colors)
  const variants = {
    primary: "bg-[#005494] text-white hover:bg-[#004080] shadow-[0_2px_4px_rgba(0,84,148,0.2)]", // Official Brand Blue
    secondary: "bg-white text-[#005494] border-2 border-[#005494] hover:bg-blue-50",
    outline: "bg-transparent text-[#005494] border border-[#005494] hover:bg-[#005494] hover:text-white",
    ghost: "bg-transparent text-gray-600 hover:text-[#005494] hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  // 3. Sizes (Padding & Text)
  const sizes = {
    sm: "px-4 py-1.5 text-xs rounded-[4px]",
    md: "px-6 py-2.5 text-sm rounded-[4px]",    // Standard
    lg: "px-8 py-3.5 text-base rounded-[4px]",   // Hero Search Buttons
    xl: "px-10 py-4 text-lg rounded-[6px]"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;