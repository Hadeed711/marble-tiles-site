import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function SplashLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <motion.img
            src={logo}
            alt="Logo"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="w-40 h-40 object-contain mb-8 drop-shadow-lg"
          />
          {/* Animated green loader bar */}
          <motion.div
            initial={{ scaleX: 0.2 }}
            animate={{ scaleX: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="h-3 w-40 bg-[#00796b] rounded-full origin-center shadow-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}