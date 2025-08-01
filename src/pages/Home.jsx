import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import HoverShadowBg from "../components/HoverShadowBg";
import PremiumButton from "../components/PremiumButton";
import slider1 from "../assets/cover_img3.jpg";
import slider2 from "../assets/cover_img4.jpg";
import slider3 from "../assets/cover_img.jpg";
import floor from "../assets/floors/gallery64.jpg";
import stair from "../assets/stairs/gallery65.jpg";
import surface from "../assets/others/gallery61.jpg";
import mosaic from "../assets/mosaic/gallery63.jpg";

// Import product images
import black_gold from "../assets/products/black_gold.jpg";
import star_black from "../assets/products/star_black.jpg";
import sunny_white from "../assets/products/sunny_white.jpg";
import sunny_grey from "../assets/products/sunny_grey.jpg";
import tropical_grey from "../assets/products/tropical_grey.png";


// High-quality marble and stone images
const sliderImages = [slider1, slider2, slider3];

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
  const [backendFeaturedProducts, setBackendFeaturedProducts] = useState([]);
  const [useBackendProducts, setUseBackendProducts] = useState(false);

  // Try to fetch featured products from backend
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net/api/products/');
        if (response.ok) {
          const data = await response.json();
          const products = data.results || data;
          // Get only featured products or first 5 if no featured flag
          const featured = products.filter(p => p.is_featured).slice(0, 5);
          if (featured.length > 0) {
            setBackendFeaturedProducts(featured.map(p => ({
              image: `https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net${p.image}`,
              name: p.name,
              price: `₹${p.price}/sq ft`
            })));
            setUseBackendProducts(true);
          }
        }
      } catch (error) {
        console.log('Using fallback featured products:', error);
        // Will use hardcoded products as fallback
      }
    };

    fetchFeaturedProducts();
  }, []);

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
      price: "₹12,000/sq ft"
    },
    {
      image: star_black,
      name: "Star Black Marble",
      price: "₹8,500/sq ft"
    },
    {
      image: sunny_white,
      name: "Sunny White Marble",
      price: "₹6,800/sq ft"
    },
    {
      image: sunny_grey,
      name: "Sunny Grey Marble",
      price: "₹7,200/sq ft"
    },
    {
      image: tropical_grey,
      name: "Tropical Grey Granite",
      price: "₹9,500/sq ft"
    },
  ];

  // Get current featured products (backend or fallback)
  const currentFeaturedProducts = useBackendProducts && backendFeaturedProducts.length > 0 
    ? backendFeaturedProducts 
    : featuredProducts;

  // Calculate max index for the product slider - responsive
  const maxProductIndex = Math.max(
    0,
    currentFeaturedProducts.length - currentCardsToShow
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
        <Navbar />

        {/* Hero Slider */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] rounded-none sm:rounded-lg overflow-hidden mt-16 sm:mt-20">
          {sliderImages.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="Marble Slide"
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
        <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 space-y-12 sm:space-y-16 md:space-y-20">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              <motion.div
                className={`flex flex-col ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-6 sm:gap-8`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                {/* Content Section - Shows first on mobile */}
                <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 order-1 md:order-none">
                  {/* Title with gradient effect */}
                  <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00796b] via-[#d4af37] to-[#00796b] bg-clip-text text-transparent mb-3 sm:mb-4 text-center md:text-left leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h2>

                  {/* Description with typing effect */}
                  <motion.p 
                    className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4 text-center md:text-left font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Subheading with premium styling */}
                  <motion.div
                    className="text-center md:text-left mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-[#00796b] mb-2 relative inline-block">
                      {service.subheading}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#d4af37] to-[#00796b]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      />
                    </h3>
                  </motion.div>

                  {/* Feature list with staggered animations */}
                  <motion.ul 
                    className="text-sm sm:text-base text-gray-600 space-y-3 sm:space-y-4 text-center md:text-left"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {service.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        className="flex items-start justify-center md:justify-start gap-3 group/item hover:text-[#00796b] transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + featureIndex * 0.05, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="w-2 h-2 bg-gradient-to-r from-[#d4af37] to-[#00796b] rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"
                          whileHover={{ 
                            scale: 1.5,
                            boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)"
                          }}
                        />
                        <span className="leading-relaxed font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* CTA Button with futuristic design */}
                  <motion.div 
                    className="text-center md:text-left mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <PremiumButton
                      to="/contact"
                      leftIcon="M13 10V3L4 14h7v7l9-11h-7z"
                      rightIcon="M17 8l4 4m0 0l-4 4m4-4H3"
                      className="px-8 py-4 text-sm sm:text-base"
                    >
                      Get Premium Quote
                    </PremiumButton>
                  </motion.div>
                </div>

                {/* Image Section - Shows second on mobile */}
                <motion.div 
                  className="w-full md:w-1/2 relative overflow-hidden rounded-xl order-2 md:order-none"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-68 sm:h-80 md:h-96 rounded-xl shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating overlay badge */}
                  <motion.div
                    className="absolute top-4 left-4 bg-gradient-to-r from-[#00796b]/90 to-[#d4af37]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    Premium Service
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced divider with animated gradient */}
              <motion.div 
                className="flex justify-center mt-8 sm:mt-12"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="relative">
                  <div className="h-1 w-32 sm:w-48 bg-gradient-to-r from-[#d4af37] via-[#00796b] to-[#d4af37] rounded-full group-hover:w-64 transition-all duration-500"></div>
                  <div className="absolute inset-0 h-1 w-32 sm:w-48 bg-gradient-to-r from-[#d4af37] via-[#00796b] to-[#d4af37] rounded-full opacity-50 blur-sm group-hover:w-64 transition-all duration-500"></div>
                </div>
              </motion.div>
            </div>
          ))}
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
                    cardWidth * currentFeaturedProducts.length +
                    24 * (currentFeaturedProducts.length - 1)
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
                {currentFeaturedProducts.map((product) => (
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
