import { Link } from "react-router-dom";

export default function PremiumButton({ 
  to, 
  children, 
  leftIcon, 
  rightIcon, 
  className = "", 
  variant = "primary" 
}) {
  const baseClasses = "group relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base font-semibold text-white rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${className}`}
    >
      {/* Gradient Background - Smooth reversal effect like hero button */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00796b] via-[#d4af37] to-[#00796b] bg-[length:200%_100%] bg-left group-hover:bg-right transition-all duration-700"></div>

      {/* Button Content */}
      <span className="relative flex items-center gap-1 sm:gap-2">
        {leftIcon && (
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={leftIcon}
            />
          </svg>
        )}
        
        {children}
        
        {rightIcon && (
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={rightIcon}
            />
          </svg>
        )}
      </span>

      {/* Shimmer Effect - Just like the hero button */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </Link>
  );
}
