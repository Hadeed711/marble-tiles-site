import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import Card from "../components/Card";
import PremiumButton from "../components/PremiumButton";
import slider1 from "../assets/slider1.jpg";
import hero from "../assets/hero_img1.jpg";

// Import your original product images
import black_gold from "../assets/products/black_gold.jpg";
import booti_seena from "../assets/products/booti_seena.png";
import jet_black from "../assets/products/jet_black.png";
import star_black from "../assets/products/star_black.jpg";
import taweera from "../assets/products/taweera.png";
import tropical_grey from "../assets/products/tropical_grey.png";
import sunny_white from "../assets/products/sunny_white.jpg";
import sunny_grey from "../assets/products/sunny_grey.jpg";

export default function Products() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8); // Show only 8 products initially (2 rows)

  const BACKEND_URL = 'https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net';

  // Fallback products with your original images and data
  const fallbackProducts = [
    { 
      id: 1,
      image: black_gold, 
      name: "Black Gold Marble", 
      price: "12,000",
      category: { slug: "marble", name: "Marble" },
      description: "Premium black marble with gold veining"
    },
    { 
      id: 2,
      image: star_black, 
      name: "Star Black Marble", 
      price: "8,500",
      category: { slug: "marble", name: "Marble" },
      description: "Elegant black marble with star patterns"
    },
    { 
      id: 3,
      image: taweera, 
      name: "Taweera Granite", 
      price: "9,200",
      category: { slug: "granite", name: "Granite" },
      description: "Durable granite with natural patterns"
    },
    { 
      id: 4,
      image: jet_black, 
      name: "Jet Black Marble", 
      price: "7,800",
      category: { slug: "marble", name: "Marble" },
      description: "Deep black marble for modern designs"
    },
    { 
      id: 5,
      image: tropical_grey, 
      name: "Tropical Grey Granite", 
      price: "10,500",
      category: { slug: "granite", name: "Granite" },
      description: "Grey granite with tropical patterns"
    },
    { 
      id: 6,
      image: booti_seena, 
      name: "Booti Seena Granite", 
      price: "8,200",
      category: { slug: "granite", name: "Granite" },
      description: "Classic granite with speckled finish"
    },
    { 
      id: 7,
      image: sunny_white, 
      name: "Sunny White Marble", 
      price: "6,800",
      category: { slug: "marble", name: "Marble" },
      description: "Bright white marble for luxury spaces"
    },
    { 
      id: 8,
      image: sunny_grey, 
      name: "Sunny Grey Marble", 
      price: "7,200",
      category: { slug: "marble", name: "Marble" },
      description: "Sophisticated grey marble with subtle veining"
    },
  ];

  const fallbackCategories = [
    { id: "all", name: "All Products" },
    { id: "marble", name: "Marble" },
    { id: "granite", name: "Granite" },
  ];

  // Fetch products and categories from backend with fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Trying to fetch from backend...');
        
        // Try to fetch products from backend
        const productsResponse = await fetch(`${BACKEND_URL}/api/products/`);
        
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          const backendProducts = productsData.results || productsData;
          
          // Check if we have valid products with images
          if (backendProducts && backendProducts.length > 0) {
            console.log('Using backend products:', backendProducts);
            setProducts(backendProducts);
          } else {
            console.log('No backend products found, using fallback');
            setProducts(fallbackProducts);
          }
        } else {
          console.log('Backend failed, using fallback products');
          setProducts(fallbackProducts);
        }

        // Try to fetch categories from backend
        const categoriesResponse = await fetch(`${BACKEND_URL}/api/products/categories/`);
        
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData && categoriesData.length > 0) {
            const formattedCategories = [
              { id: "all", name: "All Products" },
              ...categoriesData.map(cat => ({ id: cat.slug, name: cat.name }))
            ];
            setCategories(formattedCategories);
          } else {
            setCategories(fallbackCategories);
          }
        } else {
          console.log('Using fallback categories');
          setCategories(fallbackCategories);
        }

      } catch (error) {
        console.log('Error fetching from backend, using fallback:', error);
        setProducts(fallbackProducts);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get search query from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || 
                           (product.category && product.category.slug === selectedCategory) ||
                           (product.category && product.category.name.toLowerCase() === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Show only visibleProducts number of products for pagination
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 8); // Load 8 more products
  };

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
          <PremiumButton
            to="/"
            leftIcon="M10 19l-7-7m0 0l7-7m-7 7h18"
          >
            Back to Home
          </PremiumButton>
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
                onClick={() => handleCategoryChange(category.id)}
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
            Showing {displayedProducts.length} of {totalCount} products
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
                setSearchTerm("");
                setSelectedCategory("all");
                setVisibleProducts(8); // Reset to 8 products
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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00796b] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <div className="text-red-500 mb-4">
                <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading products</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          ) : displayedProducts.length > 0 ? (
            <>
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card 
                    image={product.image && (product.image.startsWith('http') || product.image.startsWith('/media')) ? `${BACKEND_URL}${product.image}` : product.image || hero} 
                    name={product.name} 
                    price={product.price ? (typeof product.price === 'string' ? `PKR ${product.price}` : `PKR ${product.price}`) : 'Contact for price'}
                    onImageClick={handleImageClick}
                  />
                </motion.div>
              ))}
              
              {/* Load More Button */}
              {displayedProducts.length < filteredProducts.length && (
                <div className="col-span-full text-center mt-8">
                  <motion.button
                    onClick={handleLoadMore}
                    className="bg-[#00796b] text-white px-8 py-3 rounded-full hover:bg-[#d4af37] transition-all duration-300 font-medium shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
                  </motion.button>
                </div>
              )}

              {/* Show total count */}
              {displayedProducts.length > 0 && (
                <div className="col-span-full text-center mt-4 text-gray-600">
                  Showing {displayedProducts.length} of {filteredProducts.length} products
                </div>
              )}
            </>
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
