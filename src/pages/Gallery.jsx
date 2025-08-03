import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import hero from "../assets/hero_img1.jpg";

// Import ALL stairs images
import stairs1 from "../assets/stairs/gallery16.jpg";
import stairs2 from "../assets/stairs/gallery33.jpg";
import stairs3 from "../assets/stairs/gallery34.jpg";
import stairs4 from "../assets/stairs/gallery35.jpg";
import stairs5 from "../assets/stairs/gallery39.jpg";
import stairs6 from "../assets/stairs/gallery41.jpg";
import stairs7 from "../assets/stairs/gallery47.jpg";
import stairs8 from "../assets/stairs/gallery48.jpg";
import stairs9 from "../assets/stairs/gallery49.jpg";
import stairs10 from "../assets/stairs/gallery5.jpg";
import stairs11 from "../assets/stairs/gallery52.jpg";
import stairs12 from "../assets/stairs/gallery53.jpg";
import stairs13 from "../assets/stairs/gallery54.jpg";
import stairs14 from "../assets/stairs/gallery55.jpg";
import stairs15 from "../assets/stairs/gallery56.jpg";
import stairs16 from "../assets/stairs/gallery65.jpg";
import stairs17 from "../assets/stairs/gallery66.jpg";
import stairs18 from "../assets/stairs/gallery7.jpg";

// Import ALL floors images
import floor1 from "../assets/floors/gallery10.jpg";
import floor2 from "../assets/floors/gallery11.jpg";
import floor3 from "../assets/floors/gallery12.jpg";
import floor4 from "../assets/floors/gallery13.jpg";
import floor5 from "../assets/floors/gallery14.jpg";
import floor6 from "../assets/floors/gallery15.jpg";
import floor7 from "../assets/floors/gallery25.jpg";
import floor8 from "../assets/floors/gallery31.jpg";
import floor9 from "../assets/floors/gallery32.jpg";
import floor10 from "../assets/floors/gallery37.jpg";
import floor11 from "../assets/floors/gallery38.jpg";
import floor12 from "../assets/floors/gallery4.jpg";
import floor13 from "../assets/floors/gallery42.jpg";
import floor14 from "../assets/floors/gallery44.jpg";
import floor15 from "../assets/floors/gallery46.jpg";
import floor16 from "../assets/floors/gallery57.jpg";
import floor17 from "../assets/floors/gallery6.jpg";
import floor18 from "../assets/floors/gallery64.jpg";
import floor19 from "../assets/floors/gallery8.jpg";
import floor20 from "../assets/floors/gallery9.jpg";

// Import ALL mosaic images
import mosaic1 from "../assets/mosaic/gallery17.jpg";
import mosaic2 from "../assets/mosaic/gallery19.jpg";
import mosaic3 from "../assets/mosaic/gallery20.jpg";
import mosaic4 from "../assets/mosaic/gallery21.jpg";
import mosaic5 from "../assets/mosaic/gallery22.jpg";
import mosaic6 from "../assets/mosaic/gallery23.jpg";
import mosaic7 from "../assets/mosaic/gallery24.jpg";
import mosaic8 from "../assets/mosaic/gallery29.jpg";
import mosaic9 from "../assets/mosaic/gallery30.jpg";
import mosaic10 from "../assets/mosaic/gallery36.jpg";
import mosaic11 from "../assets/mosaic/gallery40.jpg";
import mosaic12 from "../assets/mosaic/gallery63.jpg";

// Import ALL others images
import other1 from "../assets/others/gallery1.jpg";
import other2 from "../assets/others/gallery18.jpg";
import other3 from "../assets/others/gallery2.jpg";
import other4 from "../assets/others/gallery26.jpg";
import other5 from "../assets/others/gallery27.jpg";
import other6 from "../assets/others/gallery28.jpg";
import other7 from "../assets/others/gallery3.jpg";
import other8 from "../assets/others/gallery43.jpg";
import other9 from "../assets/others/gallery45.jpg";
import other10 from "../assets/others/gallery50.jpg";
import other11 from "../assets/others/gallery51.jpg";
import other12 from "../assets/others/gallery58.jpg";
import other13 from "../assets/others/gallery61.jpg";






export default function Gallery() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(8);

  // Gallery images using local assets only
  const localGalleryImages = [
    // Stairs collection (18 images)
    { id: 1, title: "Premium Marble Staircase Design", image: stairs1, category: { slug: "stairs", name: "Stairs" }, project_location: "Faisalabad" },
    { id: 2, title: "Elegant Curved Staircase", image: stairs2, category: { slug: "stairs", name: "Stairs" }, project_location: "Lahore" },
    { id: 3, title: "Modern Spiral Stairs", image: stairs3, category: { slug: "stairs", name: "Stairs" }, project_location: "Karachi" },
    { id: 4, title: "Classic Marble Steps", image: stairs4, category: { slug: "stairs", name: "Stairs" }, project_location: "Islamabad" },
    { id: 5, title: "Luxury Staircase Installation", image: stairs5, category: { slug: "stairs", name: "Stairs" }, project_location: "Faisalabad" },
    { id: 6, title: "Contemporary Stair Design", image: stairs6, category: { slug: "stairs", name: "Stairs" }, project_location: "Lahore" },
    { id: 7, title: "Granite Step Construction", image: stairs7, category: { slug: "stairs", name: "Stairs" }, project_location: "Multan" },
    { id: 8, title: "Premium Stair Finishing", image: stairs8, category: { slug: "stairs", name: "Stairs" }, project_location: "Rawalpindi" },
    { id: 9, title: "Marble Staircase with Railing", image: stairs9, category: { slug: "stairs", name: "Stairs" }, project_location: "Gujranwala" },
    { id: 10, title: "Designer Staircase Project", image: stairs10, category: { slug: "stairs", name: "Stairs" }, project_location: "Sialkot" },
    { id: 11, title: "Royal Staircase Design", image: stairs11, category: { slug: "stairs", name: "Stairs" }, project_location: "Peshawar" },
    { id: 12, title: "Executive Stair Installation", image: stairs12, category: { slug: "stairs", name: "Stairs" }, project_location: "Quetta" },
    { id: 13, title: "Curved Marble Steps", image: stairs13, category: { slug: "stairs", name: "Stairs" }, project_location: "Hyderabad" },
    { id: 14, title: "Premium Staircase Work", image: stairs14, category: { slug: "stairs", name: "Stairs" }, project_location: "Sargodha" },
    { id: 15, title: "Modern Stair Architecture", image: stairs15, category: { slug: "stairs", name: "Stairs" }, project_location: "Bahawalpur" },
    { id: 16, title: "Elegant Staircase Design", image: stairs16, category: { slug: "stairs", name: "Stairs" }, project_location: "Sukkur" },
    { id: 17, title: "Luxury Marble Stairway", image: stairs17, category: { slug: "stairs", name: "Stairs" }, project_location: "Larkana" },
    { id: 18, title: "Designer Steps Installation", image: stairs18, category: { slug: "stairs", name: "Stairs" }, project_location: "Mardan" },

    // Floors collection (20 images)
    { id: 19, title: "Premium Marble Flooring", image: floor1, category: { slug: "floors", name: "Floors" }, project_location: "Faisalabad" },
    { id: 20, title: "Luxury Floor Installation", image: floor2, category: { slug: "floors", name: "Floors" }, project_location: "Lahore" },
    { id: 21, title: "Modern Floor Design", image: floor3, category: { slug: "floors", name: "Floors" }, project_location: "Karachi" },
    { id: 22, title: "Elegant Granite Flooring", image: floor4, category: { slug: "floors", name: "Floors" }, project_location: "Islamabad" },
    { id: 23, title: "Designer Floor Pattern", image: floor5, category: { slug: "floors", name: "Floors" }, project_location: "Faisalabad" },
    { id: 24, title: "Contemporary Flooring", image: floor6, category: { slug: "floors", name: "Floors" }, project_location: "Lahore" },
    { id: 25, title: "Marble Floor Masterpiece", image: floor7, category: { slug: "floors", name: "Floors" }, project_location: "Multan" },
    { id: 26, title: "Luxury Marble Installation", image: floor8, category: { slug: "floors", name: "Floors" }, project_location: "Rawalpindi" },
    { id: 27, title: "Premium Floor Finishing", image: floor9, category: { slug: "floors", name: "Floors" }, project_location: "Gujranwala" },
    { id: 28, title: "Executive Floor Design", image: floor10, category: { slug: "floors", name: "Floors" }, project_location: "Sialkot" },
    { id: 29, title: "Granite Floor Pattern", image: floor11, category: { slug: "floors", name: "Floors" }, project_location: "Peshawar" },
    { id: 30, title: "Modern Marble Flooring", image: floor12, category: { slug: "floors", name: "Floors" }, project_location: "Quetta" },
    { id: 31, title: "Elegant Floor Installation", image: floor13, category: { slug: "floors", name: "Floors" }, project_location: "Hyderabad" },
    { id: 32, title: "Designer Marble Floor", image: floor14, category: { slug: "floors", name: "Floors" }, project_location: "Sargodha" },
    { id: 33, title: "Premium Granite Flooring", image: floor15, category: { slug: "floors", name: "Floors" }, project_location: "Bahawalpur" },
    { id: 34, title: "Luxury Floor Project", image: floor16, category: { slug: "floors", name: "Floors" }, project_location: "Sukkur" },
    { id: 35, title: "Contemporary Floor Design", image: floor17, category: { slug: "floors", name: "Floors" }, project_location: "Larkana" },
    { id: 36, title: "Marble Floor Excellence", image: floor18, category: { slug: "floors", name: "Floors" }, project_location: "Mardan" },
    { id: 37, title: "Executive Flooring Work", image: floor19, category: { slug: "floors", name: "Floors" }, project_location: "Chiniot" },
    { id: 38, title: "Premium Floor Craftsmanship", image: floor20, category: { slug: "floors", name: "Floors" }, project_location: "Sahiwal" },

    // Mosaic collection (12 images)
    { id: 39, title: "Artistic Mosaic Design", image: mosaic1, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Faisalabad" },
    { id: 40, title: "Decorative Mosaic Pattern", image: mosaic2, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Lahore" },
    { id: 41, title: "Premium Mosaic Work", image: mosaic3, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Karachi" },
    { id: 42, title: "Elegant Mosaic Installation", image: mosaic4, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Islamabad" },
    { id: 43, title: "Contemporary Mosaic Art", image: mosaic5, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Faisalabad" },
    { id: 44, title: "Designer Mosaic Pattern", image: mosaic6, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Lahore" },
    { id: 45, title: "Luxury Mosaic Design", image: mosaic7, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Multan" },
    { id: 46, title: "Artistic Mosaic Creation", image: mosaic8, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Rawalpindi" },
    { id: 47, title: "Premium Mosaic Artwork", image: mosaic9, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Gujranwala" },
    { id: 48, title: "Decorative Mosaic Project", image: mosaic10, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Sialkot" },
    { id: 49, title: "Modern Mosaic Installation", image: mosaic11, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Peshawar" },
    { id: 50, title: "Executive Mosaic Design", image: mosaic12, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Quetta" },

    // Others collection (13 images)
    { id: 51, title: "Custom Stone Installation", image: other1, category: { slug: "others", name: "Others" }, project_location: "Faisalabad" },
    { id: 52, title: "Special Project Design", image: other2, category: { slug: "others", name: "Others" }, project_location: "Lahore" },
    { id: 53, title: "Unique Marble Work", image: other3, category: { slug: "others", name: "Others" }, project_location: "Karachi" },
    { id: 54, title: "Designer Stone Project", image: other4, category: { slug: "others", name: "Others" }, project_location: "Islamabad" },
    { id: 55, title: "Premium Custom Work", image: other5, category: { slug: "others", name: "Others" }, project_location: "Faisalabad" },
    { id: 56, title: "Elegant Stone Installation", image: other6, category: { slug: "others", name: "Others" }, project_location: "Lahore" },
    { id: 57, title: "Luxury Custom Design", image: other7, category: { slug: "others", name: "Others" }, project_location: "Multan" },
    { id: 58, title: "Executive Stone Work", image: other8, category: { slug: "others", name: "Others" }, project_location: "Rawalpindi" },
    { id: 59, title: "Contemporary Installation", image: other9, category: { slug: "others", name: "Others" }, project_location: "Gujranwala" },
    { id: 60, title: "Artistic Stone Project", image: other10, category: { slug: "others", name: "Others" }, project_location: "Sialkot" },
    { id: 61, title: "Designer Custom Work", image: other11, category: { slug: "others", name: "Others" }, project_location: "Peshawar" },
    { id: 62, title: "Premium Stone Installation", image: other12, category: { slug: "others", name: "Others" }, project_location: "Quetta" },
    { id: 63, title: "Luxury Custom Project", image: other13, category: { slug: "others", name: "Others" }, project_location: "Hyderabad" },
  ];

  // Calculate counts for local categories
  const mosaicCount = localGalleryImages.filter(img => img.category.slug === "mosaic").length;
  const floorsCount = localGalleryImages.filter(img => img.category.slug === "floors").length;
  const stairsCount = localGalleryImages.filter(img => img.category.slug === "stairs").length;
  const othersCount = localGalleryImages.filter(img => img.category.slug === "others").length;
  const totalCount = localGalleryImages.length;

  // Local categories based on actual assets structure
  const localCategories = [
    { id: "all", name: "All", icon: "🏛️", count: 63 }, // Total images
    { id: "stairs", name: "Stairs", icon: "🪜", count: 18 }, // 18 stairs images
    { id: "floors", name: "Floors", icon: "🏢", count: 20 }, // 20 floors images  
    { id: "mosaic", name: "Mosaic", icon: "🎨", count: 12 }, // 12 mosaic images
    { id: "others", name: "Others", icon: "🔹", count: 13 }, // 13 others images
  ];

  // Initialize gallery with local images
  useEffect(() => {
    setLoading(true);
    console.log('Using local gallery images:', localGalleryImages.length);
    setGalleryImages(localGalleryImages);
    setCategories(localCategories);
    setLoading(false);
  }, []);

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Stairs': '🪜',
      'Floors': '🏢',
      'Kitchen Countertops': '🍳',
      'Bathroom': '🛁',
      'Wall Cladding': '🧱',
      'Mosaic Work': '🎨',
      'Commercial Projects': '🏢'
    };
    return icons[categoryName] || '📸';
  };

  // Filter images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => {
        const hasCategory = img.category && (
          img.category.slug === selectedCategory || 
          (img.category.name && img.category.name.toLowerCase() === selectedCategory) ||
          (typeof img.category === 'string' && img.category.toLowerCase() === selectedCategory)
        );
        
        return hasCategory;
      });

  console.log(`Gallery Debug: selectedCategory=${selectedCategory}, totalImages=${galleryImages.length}, filteredImages=${filteredImages.length}`);

  const displayedImages = filteredImages.slice(0, visibleImages);

  const handleLoadMore = () => {
    setVisibleImages(prev => prev + 8); // Load 8 more images incrementally
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setVisibleImages(8); // Reset to show first 8 images when changing category
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const handleNextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative bg-[#f9f9f9] text-[#06201d] min-h-screen overflow-hidden">
      <HoverShadowBg mousePosition={mousePosition} />
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section 
          className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center relative z-10 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${hero})`,
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Gallery
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore our stunning collection of marble and granite installations. 
              From elegant staircases to luxurious floors, witness the artistry in every project.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-[#00796b] text-white shadow-lg transform scale-105'
                      : 'bg-white text-[#00796b] border border-[#00796b] hover:bg-[#00796b] hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                  {category.count !== undefined && (
                    <span className="text-xs opacity-75">({category.count})</span>
                  )}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-16">
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
                      Loading Gallery
                    </motion.p>
                    <p className="text-gray-500 text-sm">Fetching stunning project images...</p>
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
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading gallery</h3>
                  <p className="text-gray-600">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {displayedImages.map((image, index) => (
                    <motion.div
                      key={image.id || index}
                      className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => openLightbox(image)}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={image.image || hero}
                          alt={image.title || 'Gallery image'}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="text-sm font-medium">View</p>
                          </div>
                        </div>
                      </div>
                      {image.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <h3 className="text-white text-sm font-medium">{image.title}</h3>
                          {image.project_location && (
                            <p className="text-white/80 text-xs">{image.project_location}</p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Load More Button */}
                {displayedImages.length < filteredImages.length && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      className="bg-[#00796b] text-white px-8 py-3 rounded-full hover:bg-[#d4af37] transition-all duration-300 font-medium"
                    >
                      Load More ({filteredImages.length - displayedImages.length} remaining)
                    </button>
                  </div>
                )}

                {/* No Images Message */}
                {filteredImages.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                    <p className="text-gray-600">Try selecting a different category</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      <Footer />

      {/* Lightbox Modal - Moved outside main container to avoid stacking context issues */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{ zIndex: 999999, position: 'fixed' }}
          >
            <motion.div
              className="relative max-w-4xl max-h-full z-[100000]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: 1000000 }}
            >
              <img
                src={lightboxImage.image || hero}
                alt={lightboxImage.title || 'Gallery image'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              {lightboxImage.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-white text-lg font-medium">{lightboxImage.title}</h3>
                  {lightboxImage.description && (
                    <p className="text-white/90 text-sm mt-1">{lightboxImage.description}</p>
                  )}
                  {lightboxImage.project_location && (
                    <p className="text-white/80 text-sm mt-1">📍 {lightboxImage.project_location}</p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}