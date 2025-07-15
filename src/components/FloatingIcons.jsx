import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingIcons() {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after 4 seconds on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="floating-icons-container fixed bottom-4 sm:bottom-6 left-4 sm:left-6 flex flex-col gap-3 sm:gap-4 z-50 transition-transform duration-300">
      {/* Mobile Instructions Tooltip */}
      {showTooltip && (
        <motion.div
          className="sm:hidden absolute -top-16 left-0 bg-black/80 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          style={{
            animation: 'fadeInOut 4s ease-in-out forwards'
          }}
        >
          Drag icons right to hide
          <div className="absolute bottom-0 left-4 translate-y-1 w-2 h-2 bg-black/80 rotate-45"></div>
        </motion.div>
      )}

      {/* WhatsApp Icon - Top */}
      <motion.a
        href="https://wa.me/923001234567?text=Hello%20Sundar%20Marbles!%20I'm%20interested%20in%20your%20marble%20and%20granite%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
        drag="x"
        dragConstraints={{ left: 0, right: 200 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            // Hide on mobile when dragged right
            setIsVisible(false);
            setTimeout(() => {
              setIsVisible(true);
            }, 3000);
          }
        }}
      >
        {/* Close button for desktop */}
        <button
          className="hidden sm:block absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all duration-200 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsVisible(false);
          }}
        >
          ×
        </button>

        {/* WhatsApp Button */}
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg 
            width="24" 
            height="24" 
            className="sm:w-7 sm:h-7 text-white"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
          </svg>
        </motion.div>
        
        {/* WhatsApp Tooltip */}
        <motion.div
          className="absolute left-16 sm:left-18 top-1/2 -translate-y-1/2 bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          Chat on WhatsApp
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#25D366] rotate-45"></div>
        </motion.div>
      </motion.a>

      {/* Facebook Icon - Bottom */}
      <motion.a
        href="https://facebook.com/sundarmarbles"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8, type: "spring", stiffness: 100 }}
        drag="x"
        dragConstraints={{ left: 0, right: 200 }}
        dragElastic={0.2}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            // Hide on mobile when dragged right
            setIsVisible(false);
            setTimeout(() => {
              setIsVisible(true);
            }, 3000);
          }
        }}
      >
        {/* Close button for desktop */}
        <button
          className="hidden sm:block absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all duration-200 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsVisible(false);
          }}
        >
          ×
        </button>

        {/* Facebook Button */}
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#1877F2] to-[#42A5F5] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ 
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        >
          <svg 
            width="24" 
            height="24" 
            className="sm:w-7 sm:h-7 text-white"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </motion.div>
        
        {/* Facebook Tooltip */}
        <motion.div
          className="absolute left-16 sm:left-18 top-1/2 -translate-y-1/2 bg-[#1877F2] text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          Follow on Facebook
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#1877F2] rotate-45"></div>
        </motion.div>
      </motion.a>
    </div>
  );
}
