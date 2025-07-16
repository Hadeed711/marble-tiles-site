import { motion } from "framer-motion";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import team1 from "../assets/profile.jpg";
import team2 from "../assets/profile.jpg";
import team3 from "../assets/profile.jpg";
import team4 from "../assets/profile.jpg";
import aboutImage from "../assets/services1.jpg";


const teamMembers = [
  {
    name: "Mian Tahir Masood",
    role: "Chief Executive",
    phone: "0300-6641727",
    image: team1,
  },
  {
    name: "Azmat Ali",
    role: "Sales Officer",
    phone: "0304-1394413",
    image: team2,
  },
  {
    name: "Mian Talha Tahir",
    role: "Unknown",
    phone: "0320-6040196",
    image: team3,
  },
  {
    name: "Unknown",
    role: "Unknown",
    phone: "Nan",
    image: team4,
  },
];

export default function About() {
   const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
 return (
  
  <div className="relative min-h-screen text-[#06201d] overflow-hidden">

    <HoverShadowBg mousePosition={mousePosition} />
    <div className="relative z-10">
      <Navbar />
      

    <div className="min-h-screen text-[#06201d] relative">

      
      {/* About Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-center">
        <motion.div
          className="w-full md:w-1/2 space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00796b] text-center md:text-left">About Sundar Marbles</h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-center md:text-left">
            Founded in 2008, Sundar Marbles has emerged as Faisalabad's most trusted name in premium marble, granite, and natural stone solutions. 
            Our journey began with a simple vision: to bring the world's finest stones to Pakistani homes and businesses, 
            combining traditional craftsmanship with modern innovation.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-center md:text-left">
            Over the past 15+ years, we've completed more than 1,000 projects, from luxurious residential interiors to 
            prestigious commercial installations. Our team of master craftsmen and skilled artisans work tirelessly to 
            ensure every piece of stone tells a story of excellence and elegance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-gradient-to-r from-[#00796b] to-[#4db6ac] p-3 sm:p-4 rounded-lg text-white">
              <h3 className="font-semibold text-base sm:text-lg">Our Mission</h3>
              <p className="text-xs sm:text-sm mt-2">To transform spaces with premium natural stones while maintaining the highest standards of quality and customer satisfaction.</p>
            </div>
            <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] p-3 sm:p-4 rounded-lg text-white">
              <h3 className="font-semibold text-base sm:text-lg">Our Vision</h3>
              <p className="text-xs sm:text-sm mt-2">To be Pakistan's leading marble and granite company, known for innovation, reliability, and timeless craftsmanship.</p>
            </div>
          </div>
          <ul className="list-none space-y-3 text-base mt-6">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#00796b] rounded-full mr-4"></span>
              Premium Marble Flooring & Installation with Lifetime Warranty
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#00796b] rounded-full mr-4"></span>
              Custom Granite Staircase Fabrication & Design
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#00796b] rounded-full mr-4"></span>
              Bespoke Marble & Granite Design Solutions
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#00796b] rounded-full mr-4"></span>
              Modern Kitchen Granite Countertops and Vanities
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#00796b] rounded-full mr-4"></span>
              Professional Consultation Services
            </li>
          </ul>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
          alt="Luxury Marble Interior Design"
          className="w-full md:w-1/2 rounded-xl shadow-lg object-cover h-64 sm:h-80 md:h-96"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1615873968403-89e068ea8a3d?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </section>

      {/* Team Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-[#00796b] mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Expert Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onMouseEnter={() => setMousePosition({ x: -9999, y: -9999 })}
              onMouseLeave={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mb-4 shadow-lg"
              />
              <h3 className="text-lg font-semibold text-[#00796b]">
                {member.name}
              </h3>
              <p className="text-sm text-[#444] mb-1">{member.role}</p>
              <p className="text-sm text-[#555]">{member.phone}</p>
              <a
                href={`https://wa.me/92${member.phone.replace(/-/g, '').slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center px-4 py-1.5 bg-[#25D366] text-white text-sm font-medium rounded-full hover:bg-[#20b858] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.72 13.06c-.33-.17-1.95-.96-2.25-1.07-.3-.12-.52-.17-.74.17-.23.33-.86 1.07-1.06 1.29-.2.22-.39.25-.72.08-.33-.17-1.4-.52-2.66-1.65-.98-.87-1.64-1.94-1.84-2.27-.2-.34-.02-.52.15-.69.16-.17.37-.43.55-.65.18-.22.24-.39.37-.65.12-.26.06-.48-.03-.65-.09-.17-.74-1.78-1.02-2.44-.27-.65-.54-.56-.74-.57-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.39-.3.3-1.15 1.12-1.15 2.75s1.18 3.19 1.35 3.41c.17.22 2.33 3.55 5.65 4.98.79.34 1.4.54 1.88.69.79.25 1.5.21 2.07.13.63-.1 1.95-.8 2.22-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.39z"
                  />
                </svg>
                Chat
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      
    </div>
    <Footer />
    </div>
    </div>
  );
  
}
