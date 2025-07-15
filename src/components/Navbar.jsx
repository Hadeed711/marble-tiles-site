import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear search after navigation
      setIsOpen(false); // Close mobile menu if open
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md shadow-md" : ""
      }`}
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.98)" // on scroll: nearly solid white
          : "linear-gradient(to right, #f5f7fa, #eaeef3)", // soft bluish-white gradient
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Sundar Logo"
            className="h-12 w-auto drop-shadow"
          />
        </Link>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/60 backdrop-blur-md border border-[#d4af37]/30 rounded-full px-4 py-1.5 shadow-md focus-within:ring-2 ring-[#00796b]/30 transition">
          <Search size={18} className="text-[#00796b] mr-2" />
          <input
            type="text"
            placeholder="Search marbles, granite..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#333] placeholder:text-[#777] outline-none w-48"
          />
          <button 
            type="submit" 
            className="ml-2 text-[#00796b] hover:text-[#d4af37] transition-colors"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-md font-medium transition-all duration-300 hover:text-[#d4af37] relative ${
                pathname === link.path
                  ? "text-[#00796b] font-semibold border-b-2 border-[#d4af37]"
                  : "text-[#333] hover:text-[#00796b]"
              }`}
            >
              <span className="hover-underline-animation">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#333] hover:text-[#00796b] transition-colors p-2"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-3">
              <Search size={18} className="text-[#00796b] mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-[#333] placeholder:text-[#777] outline-none flex-1"
              />
              <button 
                type="submit" 
                className="ml-2 text-[#00796b] hover:text-[#d4af37] transition-colors flex-shrink-0"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    pathname === link.path 
                      ? "bg-[#00796b] text-white" 
                      : "text-[#333333] hover:bg-gray-100 hover:text-[#00796b]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Hover underline CSS */}
      <style jsx>{`
        .hover-underline-animation {
          display: inline-block;
          position: relative;
        }
        .hover-underline-animation::after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #d4af37;
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .hover-underline-animation:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
    </motion.nav>
  );
}
