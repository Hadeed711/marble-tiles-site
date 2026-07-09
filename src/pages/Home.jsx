import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Card from "../components/Card";
import HoverShadowBg from "../components/HoverShadowBg";
import PremiumButton from "../components/PremiumButton";
import AdBanner from "../components/AdBanner";
import slider1 from "../assets/cover_img3.jpg";
import slider2 from "../assets/cover_img4.jpg";
import slider3 from "../assets/cover_img.jpg";
import floor from "../assets/floors/gallery64.jpg";
import stair from "../assets/stairs/gallery65.jpg";
import surface from "../assets/others/gallery61.jpg";
import mosaic from "../assets/mosaic/gallery63.jpg";

// Import product images
import black_gold from "../assets/products/black_gold.webp";
import star_black from "../assets/products/star_black.webp";
import sunny_white from "../assets/products/sunny_white.webp";
import sunny_grey from "../assets/products/sunny_grey.webp";
import tropical_grey from "../assets/products/tropical_grey.webp";


// High-quality marble and stone images
const sliderImages = [slider1, slider2, slider3];
const sliderAlts = [
  "Premium marble flooring showroom – Sundar Marbles Faisalabad",
  "Granite and marble store interior – natural stone tiles Faisalabad",
  "Marble supplier Faisalabad – premium marble slabs and granite surfaces",
];

const cardWidth = 320;
const cardsToShow = { mobile: 1, tablet: 2, desktop: 4 }; // Responsive cards

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const [productIndex, setProductIndex] = useState(0);
  const [currentCardsToShow, setCurrentCardsToShow] = useState(
    cardsToShow.desktop
  );

  // Helper to start interval
  const startSliderInterval = () => {
    clearInterval(intervalRef.current); // clear any existing interval
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
  };

  // Responsive cards detection
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentCardsToShow(cardsToShow.mobile);
      } else if (width < 1024) {
        setCurrentCardsToShow(cardsToShow.tablet);
      } else {
        setCurrentCardsToShow(cardsToShow.desktop);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  useEffect(() => {
    startSliderInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Scroll to top on component mount (page refresh)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset interval on manual change
  const handleSetCurrent = (idxOrFn) => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => {
      const next = typeof idxOrFn === "function" ? idxOrFn(prev) : idxOrFn;
      // Restart interval after state update
      // setTimeout(startSliderInterval, 0);
      return next;
    });
    startSliderInterval();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const services = [
    {
      title: "Premium Marble Flooring",
      image: floor,
      description: "Transform your space with luxurious marble flooring that defines sophistication",
      subheading: "Engineered for Perfection",
      features: [
        "Precision & leveled installation",
        "Premium marble with lifetime quality guarantee", 
        "Advanced sealing for stain & scratch resistance",
        "Custom patterns"
      ]
    },
    {
      title: "Granite & Marble Staircases", 
      image: stair,
      description: "Architectural masterpieces that elevate your home's grandeur",
      subheading: "Sculptured Excellence",
      features: [
        "Custom & Unique Pattern Designs",
        "Anti-slip for ultimate safety",
        "Premium granite with natural veining",
        "Seamless integration with existing architecture"
      ]
    },
    {
      title: "Mosaic Art Installation",
      image: mosaic, 
      description: "Artistic expressions that transform walls into living masterpieces",
      subheading: "Bespoke Artistry",
      features: [
        "Collaborative design with renowned artists",
        "Hand-cut precision mosaic textures",
        "Unique patterns with cultural storytelling",
        "Museum-grade installation techniques"
      ]
    },
    {
      title: "Bathroom & Kitchen Surfaces",
      image: surface,
      description: "Future-ready surfaces engineered for modern living spaces",
      subheading: "Smart Surface Technology", 
      features: [
        "Heat-resistant",
        "Uniquely designed Patterns",
        "Edge profiles with contemporary styling",
        "Smart integration for modern appliances"
      ]
    },
  ];

  const featuredProducts = [
    {
      image: black_gold,
      name: "Black Gold Marble",
      price: "Rs. 12,000/sq ft"
    },
    {
      image: star_black,
      name: "Star Black Marble",
      price: "Rs. 8,500/sq ft"
    },
    {
      image: sunny_white,
      name: "Sunny White Marble",
      price: "Rs. 6,800/sq ft"
    },
    {
      image: sunny_grey,
      name: "Sunny Grey Marble",
      price: "Rs. 7,200/sq ft"
    },
    {
      image: tropical_grey,
      name: "Tropical Grey Granite",
      price: "Rs. 9,500/sq ft"
    },
  ];

  // Calculate max index for the product slider - responsive
  const maxProductIndex = Math.max(
    0,
    featuredProducts.length - currentCardsToShow
  );

  // Handle previous product navigation
  const handlePrevProduct = () => {
    setProductIndex((prev) => Math.max(0, prev - 1));
  };

  // Handle next product navigation
  const handleNextProduct = () => {
    setProductIndex((prev) => Math.min(maxProductIndex, prev + 1));
  };

  const dotColors = [
    "#00796b", // for marble1
    "#d4af37", // for marble2
    "#b91c1c", // for marble3
  ];

  return (
    <div className="relative bg-[#f8f9fa] text-[#333333] overflow-hidden">
      <HoverShadowBg mousePosition={mousePosition} />

      <div className="relative z-10">
        <Seo
          title="Marble & Granite Store in Faisalabad | Sundar Marbles – Premium Supplier Since 2008"
          description="Looking for a marble or granite store in Faisalabad? Sundar Marbles is your trusted marble supplier, granite store, and mosaic tile factory. Premium natural stone floors, staircases & surfaces since 2008. Visit our showroom or call now!"
          path="/"
        />
        <Navbar />

        {/* Hero Slider */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] rounded-none sm:rounded-lg overflow-hidden mt-16 sm:mt-20">
          {sliderImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={sliderAlts[index]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: index === current ? 1 : 0, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ))}

          {/* Left Handle */}
          <button
            onClick={() =>
              handleSetCurrent(
                (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
              )
            }
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg rounded-full p-1.5 sm:p-2 z-20 transition"
            aria-label="Previous Slide"
          >
            <svg
              width="20"
              height="20"
              className="sm:w-7 sm:h-7"
              fill="none"
              stroke="#00796b"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right Handle */}
          <button
            onClick={() =>
              handleSetCurrent((prev) => (prev + 1) % sliderImages.length)
            }
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg rounded-full p-1.5 sm:p-2 z-20 transition"
            aria-label="Next Slide"
          >
            <svg
              width="20"
              height="20"
              className="sm:w-7 sm:h-7"
              fill="none"
              stroke="#00796b"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSetCurrent(idx)}
                className="focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={`block w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white transition-all duration-300`}
                  style={{
                    background:
                      idx === current
                        ? dotColors[idx]
                        : "rgba(255,255,255,0.7)",
                    borderColor:
                      idx === current
                        ? dotColors[idx]
                        : "rgba(255,255,255,0.7)",
                    opacity: idx === current ? 1 : 0.7,
                    boxShadow:
                      idx === current
                        ? `0 0 0 2px ${dotColors[idx]}44`
                        : "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Hero Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 sm:bottom-12 md:bottom-20 left-4 sm:left-8 md:left-20 right-4 sm:right-8 md:right-auto bg-white/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg max-w-full sm:max-w-md md:max-w-xl"
          >
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#00796b] leading-tight">
              Premium Marble & Granite <br className="hidden md:block" />
              <span className="md:hidden">& </span>Elegant Craftsmanship
            </h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#333] leading-relaxed mb-3 sm:mb-4 md:mb-6">
              Elevate your interiors with our timeless stones — handcrafted
              since 2008.
            </p>

            {/* Premium CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4"
            >
              <PremiumButton
                to="/products"
                leftIcon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                rightIcon="M17 8l4 4m0 0l-4 4m4-4H3"
              >
                <span className="hidden sm:inline">Explore Our</span> Products
              </PremiumButton>

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base font-medium text-[#00796b] bg-transparent border-2 border-[#00796b] rounded-full hover:bg-[#00796b] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Get Quote
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Services */}
        <div className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden">

          {/* Section Header */}
          <motion.div
            className="text-center mb-14 sm:mb-20 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight mb-4">
              Crafted With <span className="bg-gradient-to-r from-[#00796b] to-[#d4af37] bg-clip-text text-transparent">Precision</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00796b]"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From flooring to staircases, every surface we touch becomes a statement of timeless luxury.
            </p>
          </motion.div>

          {/* Service Blocks */}
          <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`group flex flex-col ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} min-h-[340px] md:min-h-[400px] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-gray-100`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Image Panel */}
                <div className="relative w-full md:w-[55%] overflow-hidden min-h-[220px] md:min-h-full">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover min-h-[220px] md:min-h-[400px] transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark gradient over image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent md:bg-gradient-to-l" style={{ background: index % 2 !== 0 ? "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" : "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}></div>

                  {/* Large service number watermark on image */}
                  <div
                    className="absolute bottom-4 text-[90px] sm:text-[110px] font-black text-white/10 leading-none select-none pointer-events-none"
                    style={{ [index % 2 !== 0 ? "right" : "left"]: "16px" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Pill badge */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] inline-block"></span>
                      Premium Service
                    </span>
                  </div>
                </div>

                {/* Content Panel */}
                  <div className="w-full md:w-[45%] bg-[#fafafa] flex flex-col justify-center px-6 sm:px-8 md:px-10 py-8 sm:py-10 relative overflow-hidden">
                  {/* Decorative large number behind text */}
                  <div className="absolute -top-4 right-0 text-[80px] font-black text-[#00796b]/5 leading-none select-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Index label */}
                  <motion.p
                    className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] mb-3"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    {String(index + 1).padStart(2, "0")} — Our Services
                  </motion.p>

                  {/* Title */}
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {service.title}
                  </motion.h2>

                  {/* Accent line */}
                  <motion.div
                    className="w-12 h-1 rounded-full bg-gradient-to-r from-[#00796b] to-[#d4af37] mb-5"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />

                  {/* Description */}
                  <motion.p
                    className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Subheading */}
                  <motion.p
                    className="text-xs font-bold uppercase tracking-widest text-[#00796b] mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    {service.subheading}
                  </motion.p>

                  {/* Features */}
                  <motion.ul
                    className="space-y-3 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {service.features.map((feature, fi) => (
                      <motion.li
                        key={fi}
                        className="flex items-start gap-3 group/feat"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + fi * 0.07, duration: 0.35 }}
                      >
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#00796b] to-[#4db6ac] flex items-center justify-center shadow-sm">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed group-hover/feat:text-[#00796b] transition-colors duration-200">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.65, duration: 0.4 }}
                  >
                    <Link
                      to="/contact"
                      className="group/btn inline-flex items-center gap-2 bg-[#00796b] hover:bg-[#005f56] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-[0_8px_25px_rgba(0,121,107,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Get a Free Quote
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#f5f5f5] flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          <motion.div
            className="w-full md:w-1/2 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00796b] mb-4 sm:mb-6 text-center md:text-left">
              About Sundar Marbles
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4 text-center md:text-left">
              Established in 2008, Sundar Marbles has been Faisalabad's premier
              destination for luxury marble, granite, and natural stone
              solutions. With over 15 years of expertise, we've transformed
              countless homes and commercial spaces with our exceptional
              craftsmanship.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 text-center md:text-left">
              Our commitment to quality, innovation, and customer satisfaction
              has made us the trusted choice for architects, interior designers,
              and homeowners seeking timeless elegance.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-[#00796b]">
                  15+
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Years Experience
                </p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37]">
                  1000+
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Projects Completed
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <Link
                to="/about"
                className="inline-block bg-gradient-to-r from-[#00796b] to-[#4db6ac] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full hover:shadow-lg transition-all duration-300"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
          <motion.img
            src={slider1}
            alt="About Sundar Marbles - Modern Interior"
            className="w-full md:w-1/2 h-64 sm:h-80 md:h-96 rounded-xl shadow-lg object-cover"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Products Slider */}
        <div className="px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#00796b] mb-6 sm:mb-8 text-center md:text-left">
            Featured Products
          </h2>
          <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[350px]">
            {/* Left Button - Hidden on mobile when no space */}
            <button
              onClick={handlePrevProduct}
              disabled={productIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white shadow-lg rounded-full p-1.5 sm:p-2 z-20 transition-all duration-300 ${
                productIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110"
              } hidden sm:block`}
              aria-label="Previous Product"
            >
              <svg
                width="20"
                height="20"
                className="sm:w-7 sm:h-7"
                fill="none"
                stroke="#00796b"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Product Cards */}
            <div className="w-full sm:w-[1360px] max-w-full mx-auto overflow-hidden py-4 sm:py-8">
              <motion.div
                className="flex gap-4 sm:gap-6"
                style={{
                  width: `${
                    cardWidth * featuredProducts.length +
                    24 * (featuredProducts.length - 1)
                  }px`,
                }}
                animate={{
                  x:
                    window.innerWidth < 640
                      ? -productIndex * (cardWidth + 16) // Smaller gap on mobile
                      : -productIndex * (cardWidth + 24),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {featuredProducts.map((product) => (
                  <div
                    key={product.name}
                    className="w-80 sm:w-80 flex-shrink-0 h-full"
                  >
                    <Card
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Button - Hidden on mobile when no space */}
            <button
              onClick={handleNextProduct}
              disabled={productIndex >= maxProductIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg rounded-full p-1.5 sm:p-2 z-20 transition-all duration-300 ${
                productIndex >= maxProductIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110"
              } hidden sm:block`}
              aria-label="Next Product"
            >
              <svg
                width="20"
                height="20"
                className="sm:w-7 sm:h-7"
                fill="none"
                stroke="#00796b"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-4 sm:hidden">
            <button
              onClick={handlePrevProduct}
              disabled={productIndex === 0}
              className={`bg-white/70 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 ${
                productIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110"
              }`}
              aria-label="Previous Product"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#00796b"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleNextProduct}
              disabled={productIndex >= maxProductIndex}
              className={`bg-white/70 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 ${
                productIndex >= maxProductIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110"
              }`}
              aria-label="Next Product"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#00796b"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {Array.from({ length: maxProductIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setProductIndex(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === productIndex
                    ? "bg-[#00796b] scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="text-center  mb-20">
          <Link
            to="/products"
            className="
      inline-flex items-center justify-center
      text-white text-base font-medium
      px-6 py-3 rounded-full shadow-md
      bg-gradient-to-r from-[#007949] to-[#4db68c]
      bg-[length:200%_100%] bg-left
      hover:bg-right
      transition-all duration-500 ease-in-out
    "
          >
            View All Products →
          </Link>
        </div>

        {/* Ad Banner before Footer */}
        <AdBanner />

        {/* SEO Content Section */}
        <section className="bg-white border-t border-gray-100 py-14 sm:py-16 px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af37] mb-3">
                Why Choose Us
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] leading-tight mb-4">
                Marble Store &amp; Granite Supplier in{" "}
                <span className="bg-gradient-to-r from-[#00796b] to-[#d4af37] bg-clip-text text-transparent">
                  Faisalabad
                </span>
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00796b]"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
              </div>
            </div>
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Sundar Marbles is Faisalabad's trusted <strong className="text-gray-800 font-semibold">marble and granite store</strong>, offering a wide selection of natural stone products for homes, offices, and commercial spaces. Whether you are looking for a reliable <strong className="text-gray-800 font-semibold">granite supplier</strong> or a complete <strong className="text-gray-800 font-semibold">marble shop in Pakistan</strong>, our showroom at Millat Road, Faisalabad has everything you need under one roof.
              </p>
              <p>
                Our product range includes <strong className="text-gray-800 font-semibold">marble flooring tiles</strong>, <strong className="text-gray-800 font-semibold">granite tiles</strong>, <strong className="text-gray-800 font-semibold">mosaic tiles</strong>, marble staircases, bathroom surfaces, and kitchen countertops. We supply premium stone varieties including Black Gold Marble, Star Black Marble, Sunny White Marble, Sunny Grey Marble, and Tropical Grey Granite — all at competitive prices.
              </p>
              <p>
                As a leading <strong className="text-gray-800 font-semibold">marble factory and supplier</strong> since 2008, we serve homeowners, builders, architects, and contractors across Faisalabad and all of Punjab, Pakistan. Visit our showroom or{" "}
                <Link to="/contact" className="text-[#00796b] font-semibold hover:underline">
                  contact us for a free quote
                </Link>{" "}
                on your next flooring or renovation project.
              </p>
            </div>
          </div>
        </section>

        <Footer />

        {/* Floating Social Media Icons */}
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 flex flex-col gap-3 sm:gap-4 z-50">
          {/* WhatsApp Icon - Top */}
          <motion.a
            href="https://wa.me/923006641727?text=Hello%20Sundar%20Marbles!%20I'm%20interested%20in%20your%20marble%20and%20granite%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* WhatsApp Button */}
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="24"
                height="24"
                className="sm:w-7 sm:h-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
              </svg>
            </motion.div>

            {/* WhatsApp Tooltip */}
            <div className="absolute left-16 sm:left-18 top-1/2 -translate-y-1/2 bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              Chat on WhatsApp
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#25D366] rotate-45"></div>
            </div>
          </motion.a>

          {/* Facebook Icon - Bottom */}
          <motion.a
            href="https://www.facebook.com/SundarMarble/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1.3,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Facebook Button */}
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#1877F2] to-[#42A5F5] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <svg
                width="24"
                height="24"
                className="sm:w-7 sm:h-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.div>

            {/* Facebook Tooltip */}
            <div className="absolute left-16 sm:left-18 top-1/2 -translate-y-1/2 bg-[#1877F2] text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              Follow on Facebook
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#1877F2] rotate-45"></div>
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
