import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import Card from "../components/Card";
import PremiumButton from "../components/PremiumButton";
import hero from "../assets/hero_img1.jpg";

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

  // Fetch ALL products from ALL pages and categories from backend (ONLY backend, no fallback)
  useEffect(() => {
    const fetchAllProducts = async () => {
      let allProducts = [];
      let nextUrl = `${BACKEND_URL}/api/products/`;
      
      while (nextUrl) {
        try {
          console.log('Fetching:', nextUrl);
          const response = await fetch(nextUrl);
          if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
          
          const data = await response.json();
          allProducts = [...allProducts, ...(data.results || [])];
          
          // Fix mixed content: Convert HTTP next URL to HTTPS
          nextUrl = data.next ? data.next.replace('http://', 'https://') : null;
          
          console.log(`✅ Fetched page with ${data.results?.length || 0} products. Total so far: ${allProducts.length}`);
          if (nextUrl) {
            console.log('Next page URL:', nextUrl);
          }
        } catch (error) {
          console.error('Error fetching page:', error);
          break; // Stop fetching if there's an error
        }
      }
      
      return allProducts;
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching ALL products from backend...');
        
        // Fetch ALL products from all pages
        const allBackendProducts = await fetchAllProducts();
        
        if (allBackendProducts && allBackendProducts.length > 0) {
          console.log(`✅ Total backend products fetched: ${allBackendProducts.length}`);
          console.log('Products:', allBackendProducts.map(p => ({ id: p.id, name: p.name })));
          setProducts(allBackendProducts);
          
          // Fetch categories from backend
          try {
            const categoriesResponse = await fetch(`${BACKEND_URL}/api/products/categories/`);
            
            if (categoriesResponse.ok) {
              const categoriesData = await categoriesResponse.json();
              console.log('Categories data:', categoriesData);
              
              if (categoriesData && categoriesData.results && categoriesData.results.length > 0) {
                const formattedCategories = [
                  { id: "all", name: "All Products", count: allBackendProducts.length },
                  ...categoriesData.results.map(cat => ({ 
                    id: cat.slug, 
                    name: cat.name,
                    count: cat.product_count || 0
                  }))
                ];
                console.log('Formatted categories:', formattedCategories);
                setCategories(formattedCategories);
              } else {
                // Create basic categories based on actual products
                const marbleCount = allBackendProducts.filter(p => p.category_name?.toLowerCase() === "marble").length;
                const graniteCount = allBackendProducts.filter(p => p.category_name?.toLowerCase() === "granite").length;
                console.log('Fallback categories - Marble:', marbleCount, 'Granite:', graniteCount);
                setCategories([
                  { id: "all", name: "All Products", count: allBackendProducts.length },
                  { id: "marble", name: "Marble", count: marbleCount },
                  { id: "granite", name: "Granite", count: graniteCount },
                ]);
              }
            } else {
              // Create basic categories based on actual products
              const marbleCount = allBackendProducts.filter(p => p.category_name?.toLowerCase() === "marble").length;
              const graniteCount = allBackendProducts.filter(p => p.category_name?.toLowerCase() === "granite").length;
              console.log('Response not OK - Marble:', marbleCount, 'Granite:', graniteCount);
              setCategories([
                { id: "all", name: "All Products", count: allBackendProducts.length },
                { id: "marble", name: "Marble", count: marbleCount },
                { id: "granite", name: "Granite", count: graniteCount },
              ]);
            }
          } catch (catError) {
            console.log('Error fetching categories, creating from products:', catError);
            // Create basic categories based on actual products
            const marbleCount = allBackendProducts.filter(p => p.category_name?.toLowerCase() === "marble").length;
            const graniteCount = allBackendProducts.filter(p => p.category_name?.toLowerCase() === "granite").length;
            console.log('Error fallback - Marble:', marbleCount, 'Granite:', graniteCount);
            setCategories([
              { id: "all", name: "All Products", count: allBackendProducts.length },
              { id: "marble", name: "Marble", count: marbleCount },
              { id: "granite", name: "Granite", count: graniteCount },
            ]);
          }
        } else {
          console.error('❌ No products found from backend');
          setError('No products available at the moment');
          setProducts([]);
          setCategories([
            { id: "all", name: "All Products", count: 0 }
          ]);
        }

      } catch (error) {
        console.error('❌ Error fetching from backend:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setCategories([
          { id: "all", name: "All Products", count: 0 }
        ]);
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
                           (product.category_name && product.category_name.toLowerCase() === selectedCategory.toLowerCase()) ||
                           (product.category && product.category.slug === selectedCategory) ||
                           (product.category && product.category.name.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Show only visibleProducts number of products for pagination
  const displayedProducts = filteredProducts.slice(0, visibleProducts);
  const totalCount = filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 8); // Load 8 more products
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setVisibleProducts(8); // Reset to 8 products when changing category
    setSearchTerm(""); // Clear search when changing category
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-[#00796b] text-white shadow-lg"
                    : "bg-white text-[#00796b] border border-[#00796b] hover:bg-[#00796b] hover:text-white"
                }`}
              >
                <span>{category.name}</span>
                {category.count !== undefined && (
                  <span className="text-xs opacity-75">({category.count})</span>
                )}
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
          <div className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
            {searchTerm && (
              <span className="block sm:inline text-[#00796b] font-medium">
                Results for "{searchTerm}"
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="block sm:inline ml-0 sm:ml-2 text-[#d4af37] font-medium">
                in {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </div>
          
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
            <div className="col-span-full text-center py-16">
              <div className="flex flex-col items-center">
                {/* Modern Spinner */}
                <div className="relative">
                  <motion.div
                    className="w-16 h-16 rounded-full border-4 border-gray-200"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00796b] border-r-[#00796b]"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                  
                  {/* Center Icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-4 h-4 bg-gradient-to-br from-[#00796b] to-[#d4af37] rounded-sm transform rotate-45"></div>
                  </motion.div>
                </div>

                {/* Loading Text */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.p
                    className="text-[#00796b] font-semibold text-lg mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    Loading Premium Products
                  </motion.p>
                  <p className="text-gray-500 text-sm">Fetching marble & granite collection...</p>
                </motion.div>

                {/* Animated Dots */}
                <div className="flex space-x-1 mt-4">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 bg-[#d4af37] rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
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
                    image={product.image ? (
                      product.image.startsWith('http') 
                        ? product.image // Already a full URL (Azure Blob)
                        : product.image.startsWith('/media') 
                          ? `${BACKEND_URL}${product.image}` // Relative URL, prepend backend
                          : product.image // Local import or other
                    ) : hero} 
                    name={product.name} 
                    price={product.price ? (typeof product.price === 'string' ? `PKR ${product.price}` : `PKR ${product.price}`) : 'Contact for price'}
                    onImageClick={handleImageClick}
                  />
                </motion.div>
              ))}
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

        {/* Load More Button - Outside the grid for better visibility */}
        {!loading && !error && displayedProducts.length > 0 && displayedProducts.length < filteredProducts.length && (
          <motion.div
            className="text-center mt-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-[#00796b] to-[#4db6ac] hover:from-[#d4af37] hover:to-[#ffd700] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#00796b] focus:ring-opacity-50"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 121, 107, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                <svg 
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  className="animate-bounce"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Load More Products
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                  {filteredProducts.length - displayedProducts.length} remaining
                </span>
              </span>
            </motion.button>
            
            {/* Progress indicator */}
            <div className="mt-4 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Showing {displayedProducts.length} of {filteredProducts.length}</span>
                <span>{Math.round((displayedProducts.length / filteredProducts.length) * 100)}% loaded</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-[#00796b] to-[#4db6ac] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(displayedProducts.length / filteredProducts.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
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