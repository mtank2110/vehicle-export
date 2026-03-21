import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "teal";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-full
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantClasses = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700
      shadow-sm hover:shadow-md
      focus:ring-blue-500
    `,
    teal: `
      bg-[#38b2ac] text-white
      hover:bg-[#319795]
      shadow-md shadow-teal-500/30
      focus:ring-teal-500
    `,
    secondary: `
      bg-gray-100 text-gray-700
      hover:bg-gray-200
      focus:ring-gray-400
    `,
    danger: `
      bg-red-500 text-white
      hover:bg-red-600
      focus:ring-red-500
    `,
    outline: `
      border-2 border-white text-white bg-transparent
      hover:bg-white hover:text-[#38b2ac]
      focus:ring-white
    `,
    ghost: `
      text-gray-600 bg-transparent
      hover:bg-gray-50
      focus:ring-gray-400
    `,
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-8 py-3 text-base gap-2",
    lg: "px-12 py-3.5 text-lg gap-2.5",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
