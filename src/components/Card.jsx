import { motion } from "framer-motion";

export default function Card({ image, name, price, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-xl shadow-lg border border-[#e0e0e0] overflow-hidden relative transition-all duration-300 hover:shadow-2xl h-full flex flex-col max-w-xs sm:max-w-sm mx-auto"
    >
      {/* Image Section */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden flex-shrink-0"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-44 sm:h-56 object-cover group-hover:brightness-110 transition-all duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1615873968403-89e068ea8a3d?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </motion.div>

      {/* Marble Info - Flexible content area */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-[#00796b] tracking-wide line-clamp-2">{name}</h3>
          {description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 min-h-[2.75rem] sm:min-h-[3.75rem]">{description}</p>
          )}
          <p className="text-xs sm:text-sm text-[#333333]">Price: <span className="text-[#d4af37] font-medium">PKR {price}</span></p>
        </div>

        {/* Button - Always at bottom */}
        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "#d4af37",
            color: "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mt-3 sm:mt-4 w-full py-2 px-3 sm:px-4 bg-[#00796b] text-white font-medium text-xs sm:text-sm rounded-lg shadow-md tracking-wider transition-all duration-300"
        >
          Order Now →
        </motion.button>
      </div>

      {/* Decorative futuristic glowing bar */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00796b] via-[#d4af37] to-[#00796b] animate-pulse blur-sm"></div>
    </motion.div>
  );
}
