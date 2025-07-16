import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, PhoneCall, Mail, Home, Info, Boxes, Contact, MapPin } from "lucide-react";
import logo from "../assets/logo.png"; // Adjust path if needed

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      
      className="relative z-10 bg-gradient-to-b from-[#004d40] to-[#30786c] text-white pt-8 sm:pt-10 pb-4 sm:pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <img src={logo} alt="Sundar Logo" className="h-10 sm:h-12 mb-2" />
          <h2 className="text-xl sm:text-2xl font-bold">SUNDAR</h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#d4af37] font-medium">Marbles & Tiles</p>
          <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-100">Since 2008 – Crafted with Precision</p>
        </div>

        {/* Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quick Links</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/" className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#d4af37] transition-colors">
                <Home size={14} className="sm:w-4 sm:h-4" /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#d4af37] transition-colors">
                <Info size={14} className="sm:w-4 sm:h-4" /> About
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#d4af37] transition-colors">
                <Boxes size={14} className="sm:w-4 sm:h-4" /> Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#d4af37] transition-colors">
                <Contact size={14} className="sm:w-4 sm:h-4" /> Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Contact</h3>
          <div className="text-xs sm:text-sm space-y-1.5 sm:space-y-2">
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <PhoneCall size={14} className="sm:w-4 sm:h-4" /> +92 300 6641727
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <Mail size={14} className="sm:w-4 sm:h-4" />
              <a 
                href="mailto:info@sundarmarbles.com?subject=Inquiry%20about%20Marble%20Products&body=Hello%20Sundar%20Marbles,%0D%0A%0D%0AI%20am%20interested%20in%20your%20marble%20and%20granite%20products.%20Please%20provide%20more%20information.%0D%0A%0D%0AThank%20you." 
                className="hover:text-[#d4af37] underline transition-colors"
              >
                info@sundarmarbles.com
              </a>
            </p>
            <p className="flex items-start justify-center sm:justify-start gap-2">
              <MapPin size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
              <span className="text-center sm:text-left">
                Chakki Stop, New Green Town, Millat Road, Faisalabad
              </span>
            </p>
            <p className="flex items-start justify-center sm:justify-start gap-2">
              <MapPin size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
              <span className="text-center sm:text-left">
                Dhanola Saim, near Hina Sana Mill, Faisalabad
              </span>
            </p>
          </div>
        </div>

        {/* Social */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Follow Us</h3>
          <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4 mt-2">
            <a href="https://www.facebook.com/SundarMarble/" target="_blank" className="hover:text-[#d4af37] transition-colors" aria-label="Facebook">
              <Facebook size={18} className="sm:w-5 sm:h-5" />
            </a>
            
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 border-t border-[#d4af37]/20 pt-3 sm:pt-4 text-center text-xs sm:text-sm text-gray-200">
        © {new Date().getFullYear()} Sundar Marbles & Tiles. All rights reserved.
      </div>
    </motion.footer>
  );
}