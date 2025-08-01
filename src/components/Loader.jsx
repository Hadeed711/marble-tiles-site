import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8, // Faster rotation
          ease: "linear",
        }}
        className="w-16 h-16 border-[4px] border-[#d4af37] border-t-transparent rounded-full" // Smaller and simpler
      ></motion.div>
      <motion.span
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          repeat: Infinity,
          duration: 1, // Faster text animation
          ease: "easeInOut",
        }}
        className="absolute text-[#00796b] mt-20 text-base font-medium" // Smaller text
      >
        Loading...
      </motion.span>
    </div>
  );
}
