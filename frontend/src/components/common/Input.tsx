import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, leftIcon, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full relative mb-4">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-gray-400">{leftIcon}</div>
          )}

          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`
              w-full px-4 py-3.5 rounded-md border-none text-sm font-medium
              bg-[#f4f8f7] text-gray-700 placeholder-gray-400 
              dark:bg-gray-800 dark:text-white dark:placeholder-gray-500
              transition-all duration-200 ease-out
              focus:bg-white dark:focus:bg-gray-700 focus:ring-1 focus:ring-[#38b2ac]
              ${leftIcon ? "pl-12" : ""}
              ${isPassword ? "pr-12" : ""}
              ${error ? "ring-1 ring-red-400 bg-red-50 dark:bg-red-900/20" : ""}
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-500 text-left">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
