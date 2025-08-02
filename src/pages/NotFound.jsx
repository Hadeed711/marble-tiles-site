import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 300px)`,
          transition: "background 0.2s ease-out",
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Glitch Effect 404 */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent relative"
            animate={{
              textShadow: [
                "0 0 10px rgba(168, 85, 247, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.8)",
                "0 0 10px rgba(168, 85, 247, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          
          {/* Glitch lines */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-20"
            style={{ clipPath: "polygon(0 40%, 100% 45%, 100% 50%, 0 48%)" }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 opacity-20"
            style={{ clipPath: "polygon(0 70%, 100% 72%, 100% 77%, 0 75%)" }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
          />
        </motion.div>

        {/* Futuristic Illustration */}
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative w-80 h-80 mx-auto">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80"
              alt="Futuristic Space Marble"
              className="w-full h-full object-cover rounded-full opacity-80"
            />
            
            {/* Holographic rings */}
            <motion.div
              className="absolute inset-0 border-2 border-purple-400 rounded-full opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 border border-cyan-400 rounded-full opacity-40"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 border border-pink-400 rounded-full opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Scanning line */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(45deg, transparent 49%, rgba(56, 189, 248, 0.6) 50%, transparent 51%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Page Not Found in the Marble Universe
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Oops! It seems you've ventured into uncharted marble territory. 
            The premium stone you're looking for has drifted into another dimension.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <Link to="/products">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Return to Earth</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="button-bg"
              />
            </motion.button>
          </Link>
          
          <Link to="/gallery">
            <motion.button
              className="px-8 py-3 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Gallery</span>
              <motion.div
                className="absolute inset-0 bg-purple-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Marble Pattern Animation */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1615873968403-89e068ea8a3d?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  );
}
