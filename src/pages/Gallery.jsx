import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import slider1 from "../assets/slider1.jpg";
import hero from "../assets/hero_img1.jpg";

export default function Gallery() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(12);

  const BACKEND_URL = 'https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net';

  // Fetch gallery images and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch gallery images
        const imagesResponse = await fetch(`${BACKEND_URL}/api/gallery/images/`);
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          setGalleryImages(imagesData.results || imagesData);
        } else {
          console.error('Failed to fetch gallery images');
        }

        // Fetch categories
        const categoriesResponse = await fetch(`${BACKEND_URL}/api/gallery/categories/`);
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          const formattedCategories = [
            { id: "all", name: "All", icon: "🏛️" },
            ...categoriesData.map(cat => ({ 
              id: cat.slug, 
              name: cat.name,
              icon: getCategoryIcon(cat.name)
            }))
          ];
          setCategories(formattedCategories);
        } else {
          console.error('Failed to fetch categories');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    : galleryImages.filter(img => 
        img.category && (img.category.slug === selectedCategory || img.category.name.toLowerCase() === selectedCategory)
      );

  const displayedImages = filteredImages.slice(0, visibleImages);

  const handleLoadMore = () => {
    setVisibleImages(prev => prev + 12);
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
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setVisibleImages(12);
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-[#00796b] text-white shadow-lg transform scale-105'
                      : 'bg-white text-[#00796b] border border-[#00796b] hover:bg-[#00796b] hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00796b] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading gallery...</p>
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
                          src={image.image ? `${BACKEND_URL}${image.image}` : hero}
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
                      Load More Images
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImage.image ? `${BACKEND_URL}${lightboxImage.image}` : hero}
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

      <Footer />
    </div>
  );
}
