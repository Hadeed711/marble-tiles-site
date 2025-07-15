import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import Card from "../components/Card";

export default function Products() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search query from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  const products = [
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", name: "Carrara White Marble", price: "3,700", category: "marble", description: "Premium Italian white marble with elegant veining" },
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", name: "Black Galaxy Granite", price: "3,900", category: "granite", description: "Stunning black granite with golden speckles" },
    { image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80", name: "Calacatta Gold Marble", price: "4,100", category: "marble", description: "Luxurious marble with distinctive gold veining" },
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", name: "Kashmir White Granite", price: "4,300", category: "granite", description: "Pure white granite with subtle gray patterns" },
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", name: "Emperador Dark Marble", price: "4,500", category: "marble", description: "Rich brown marble with cream veining" },
    { image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80", name: "Blue Pearl Granite", price: "4,700", category: "granite", description: "Elegant blue-gray granite with silver highlights" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", name: "Travertine Classic", price: "4,900", category: "travertine", description: "Natural travertine with warm beige tones" },
    { image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", name: "Verde Guatemala Marble", price: "5,100", category: "marble", description: "Exotic green marble with unique patterns" },
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "marble", name: "Marble" },
    { id: "granite", name: "Granite" },
    { id: "travertine", name: "Travertine" },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center bg-white relative z-10">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00796b] mb-3 sm:mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Premium Stone Collection
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hand-selected marble and granite pieces to elevate your space with luxury, durability, and timeless design.
        </motion.p>
        <div className="mt-4 sm:mt-6 flex justify-center">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#00796b] to-[#4db6ac] hover:from-[#4db6ac] hover:to-[#00796b] text-white px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-full transition-all duration-500"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#00796b] mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {searchTerm ? `Search Results` : 
           selectedCategory !== "all" ? `${categories.find(c => c.id === selectedCategory)?.name} Collection` : 
           "All Products"}
        </motion.h2>

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
                  description={product.description}
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

      <Footer />
      </div>
    </div>
  );
}
