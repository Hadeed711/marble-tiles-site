import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
        className="w-20 h-20 border-[6px] border-[#d4af37] border-t-transparent rounded-full shadow-xl"
        style={{
          boxShadow: "0 0 30px #d4af37aa",
        }}
      ></motion.div>
      <motion.span
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="absolute text-[#00796b] mt-28 text-lg font-semibold"
      >
        Loading...
      </motion.span>
    </div>
  );
}
