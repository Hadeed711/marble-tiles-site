import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-[9999]">
      <div className="text-center">
        {/* Modern Loading Animation */}
        <motion.div className="relative">
          {/* Outer Ring */}
          <motion.div
            className="w-20 h-20 rounded-full border-4 border-gray-200"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00796b] border-r-[#00796b]"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
              }}
            />
          </motion.div>
          
          {/* Inner Ring */}
          <motion.div
            className="absolute inset-2 w-12 h-12 rounded-full border-3 border-gray-300"
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-3 border-transparent border-b-[#d4af37] border-l-[#d4af37]"
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Center Stone Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-[#00796b] to-[#d4af37] rounded-lg transform rotate-45 shadow-lg"></div>
          </motion.div>
        </motion.div>

        {/* Loading Text with Typing Effect */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h3
            className="text-xl font-bold text-[#00796b] mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            Sundar Marbles
          </motion.h3>
          
          <motion.p
            className="text-sm text-gray-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            Loading premium stones...
          </motion.p>
        </motion.div>

        {/* Animated Dots */}
        <motion.div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[#d4af37] rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
