import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import Card from "../components/Card";
import slider1 from "../assets/slider1.jpg";
import hero from "../assets/hero_img1.jpg";

export default function Products() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [zoomedImage, setZoomedImage] = useState(null);

  // Get search query from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  const products = [
    { image: slider1, name: "Carrara White Marble", price: "3,700", category: "marble"},
    { image: slider1, name: "Black Galaxy Granite", price: "3,900", category: "granite"  },
    { image: slider1, name: "Calacatta Gold Marble", price: "4,100", category: "marble" },
    { image: slider1, name: "Kashmir White Granite", price: "4,300", category: "granite"},
    { image: slider1, name: "Emperador Dark Marble", price: "4,500", category: "marble"},
    { image: slider1, name: "Blue Pearl Granite", price: "4,700", category: "granite"},
    { image: slider1, name: "Travertine Classic", price: "4,900", category: "travertine"},
    { image: slider1, name: "Verde Guatemala Marble", price: "5,100", category: "marble"},
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "marble", name: "Marble" },
    { id: "granite", name: "Granite" },
    { id: "travertine", name: "Travertine" },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle image zoom
  const handleImageClick = (image, name) => {
    setZoomedImage({ image, name });
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  // Update URL when search term changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative bg-[#f9f9f9] text-[#06201d] min-h-screen overflow-hidden">
      <HoverShadowBg mousePosition={mousePosition} />
      <div className="relative z-10">
        <Navbar />

      {/* Premium Hero Section */}
      <section 
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center relative z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${hero})`,
        }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00796b] mb-3 sm:mb-4 leading-tight px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Premium Stone Collection
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hand-selected marble and granite pieces to elevate your space with luxury, durability, and timeless design.
        </motion.p>
        <motion.div 
          className="mt-4 sm:mt-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="relative inline-block overflow-hidden bg-gradient-to-r from-[#00796b] via-[#4db6ac] to-[#00796b] bg-[length:200%_100%] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full transition-all duration-700 group-hover:bg-right shadow-lg hover:shadow-2xl"
            >
              {/* Futuristic glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00796b] to-[#4db6ac] opacity-0 group-hover:opacity-50 blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#00796b] via-transparent to-[#4db6ac] p-[2px]"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="rounded-full bg-transparent h-full w-full" />
              </motion.div>

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    x: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </motion.svg>
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 8px rgba(255,255,255,0.8)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Back to Home
                </motion.span>
                
                {/* Particle effect */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, 10, 20],
                    y: [0, -5, -10],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </span>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 pr-8 sm:pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00796b] focus:border-transparent shadow-sm text-sm sm:text-base"
            />
            <svg
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex gap-2 flex-wrap justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#00796b] text-white shadow-lg"
                    : "bg-white text-[#00796b] border border-[#00796b] hover:bg-[#00796b] hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Results Count */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
            Showing {filteredProducts.length} of {products.length} products
            {searchTerm && (
              <span className="block sm:inline ml-0 sm:ml-2 text-[#00796b] font-medium">
                for "{searchTerm}"
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="block sm:inline ml-0 sm:ml-2 text-[#d4af37] font-medium">
                in {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </p>
          
          {(searchTerm || selectedCategory !== "all") && (
            <button
              onClick={() => {
                handleSearchChange("");
                setSelectedCategory("all");
              }}
              className="text-xs sm:text-sm text-gray-500 hover:text-[#00796b] underline mx-auto sm:mx-0"
            >
              Clear all filters
            </button>
          )}
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#00796b] mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {searchTerm ? `Search Results` : 
           selectedCategory !== "all" ? `${categories.find(c => c.id === selectedCategory)?.name} Collection` : 
           "All Products"}
        </motion.h2>

        {/* Instruction Text */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#00796b] to-[#4db6ac] px-4 py-2 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 4px 6px rgba(0, 121, 107, 0.3)",
                "0 8px 15px rgba(0, 121, 107, 0.4)",
                "0 4px 6px rgba(0, 121, 107, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              width="16" 
              height="16" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              className="animate-pulse"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Click on any product image to zoom in
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card 
                  image={product.image} 
                  name={product.name} 
                  price={product.price}
                  onImageClick={handleImageClick}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeZoom}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[95vh] sm:max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedImage.image}
                alt={zoomedImage.name}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Close button */}
              <button
                onClick={closeZoom}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
              >
                <svg width="20" height="20" className="sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Product name overlay */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-black bg-opacity-50 backdrop-blur-sm text-white p-2 sm:p-3 rounded-lg">
                <h3 className="text-sm sm:text-lg font-semibold text-center">{zoomedImage.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      </div>
    </div>
  );
}
