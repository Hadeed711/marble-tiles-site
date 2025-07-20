import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import slider1 from "../assets/slider1.jpg";
import hero from "../assets/hero_img1.jpg";

// Stairs Images
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
import stairs16 from "../assets/stairs/gallery7.jpg";
import stairs17 from "../assets/stairs/gallery65.jpg";
import stairs18 from "../assets/stairs/gallery66.jpg";

// Floors Images  
import floors1 from "../assets/floors/gallery10.jpg";
import floors2 from "../assets/floors/gallery11.jpg";
import floors3 from "../assets/floors/gallery12.jpg";
import floors4 from "../assets/floors/gallery13.jpg";
import floors5 from "../assets/floors/gallery14.jpg";
import floors6 from "../assets/floors/gallery15.jpg";
import floors7 from "../assets/floors/gallery25.jpg";
import floors8 from "../assets/floors/gallery31.jpg";
import floors9 from "../assets/floors/gallery32.jpg";
import floors10 from "../assets/floors/gallery37.jpg";
import floors11 from "../assets/floors/gallery38.jpg";
import floors12 from "../assets/floors/gallery4.jpg";
import floors13 from "../assets/floors/gallery42.jpg";
import floors14 from "../assets/floors/gallery44.jpg";
import floors15 from "../assets/floors/gallery46.jpg";
import floors16 from "../assets/floors/gallery57.jpg";
import floors17 from "../assets/floors/gallery6.jpg";
import floors18 from "../assets/floors/gallery8.jpg";
import floors19 from "../assets/floors/gallery9.jpg";
import floors20 from "../assets/floors/gallery64.jpg";

// Mosaic Images
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


// Others Images
import others1 from "../assets/others/gallery1.jpg";
import others2 from "../assets/others/gallery18.jpg";
import others3 from "../assets/others/gallery2.jpg";
import others4 from "../assets/others/gallery26.jpg";
import others5 from "../assets/others/gallery27.jpg";
import others6 from "../assets/others/gallery28.jpg";
import others7 from "../assets/others/gallery3.jpg";
import others8 from "../assets/others/gallery43.jpg";
import others9 from "../assets/others/gallery45.jpg";
import others10 from "../assets/others/gallery50.jpg";
import others11 from "../assets/others/gallery51.jpg";
import others12 from "../assets/others/gallery58.jpg";
import others13 from "../assets/others/gallery61.jpg";

export default function Gallery() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(12); // Show 12 images initially
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [cachedImages, setCachedImages] = useState(new Set()); // Cache for loaded images
  const [preloadedCategories, setPreloadedCategories] = useState(new Set()); // Track preloaded categories

  // Gallery categories with images - reordered with Others (formerly Countertops) at the end
  const galleryCategories = {
    stairs: {
      title: "Stairs",
      icon: "🪜",
      images: [stairs1, stairs2, stairs3, stairs4, stairs5, stairs6, stairs7, stairs8, stairs9, stairs10, stairs11, stairs12, stairs13, stairs14, stairs15, stairs16, stairs17, stairs18],
      description: "Elegant marble and granite staircases with precision craftsmanship"
    },
    floors: {
      title: "Floors",
      icon: "🏢",
      images: [floors1, floors2, floors3, floors4, floors5, floors6, floors7, floors8, floors9, floors10, floors11, floors12, floors13, floors14, floors15, floors16, floors17, floors18, floors19, floors20],
      description: "Luxurious marble and granite flooring for homes and commercial spaces"
    },
    mosaic: {
      title: "Mosaic",
      icon: "🎨",
      images: [mosaic1, mosaic2, mosaic3, mosaic4, mosaic5, mosaic6, mosaic7, mosaic8, mosaic9, mosaic10, mosaic11, mosaic12],
      description: "Artistic mosaic designs and custom marble patterns"
    },
    others: {
      title: "Others",
      icon: "🔹",
      images: [others1, others2, others3, others4, others5, others6, others7, others8, others9, others10, others11, others12, others13],
      description: "Premium marble and granite work including custom installations and other specialty projects"
    }
  };

  // Get all images for loading calculation
  const totalImages = Object.values(galleryCategories).reduce((total, category) => total + category.images.length, 0);

  // Preload images function
  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      if (!cachedImages.has(url)) {
        const img = new Image();
        img.onload = () => {
          setCachedImages(prev => new Set([...prev, url]));
        };
        img.src = url;
      }
    });
  };

  // Preload all images on component mount
  useEffect(() => {
    const allImageUrls = Object.values(galleryCategories).flatMap(category => category.images);
    preloadImages(allImageUrls);
  }, []);

  // Get filtered images based on active category
  const getFilteredImages = () => {
    if (activeCategory === 'all') {
      return Object.entries(galleryCategories).flatMap(([categoryKey, category]) => 
        category.images.map((img, idx) => ({
          src: img,
          category: categoryKey,
          categoryTitle: category.title,
          id: `${categoryKey}-${idx}`
        }))
      );
    }
    return galleryCategories[activeCategory].images.map((img, idx) => ({
      src: img,
      category: activeCategory,
      categoryTitle: galleryCategories[activeCategory].title,
      id: `${activeCategory}-${idx}`
    }));
  };

  // Get visible images based on pagination
  const getVisibleImages = () => {
    const allImages = getFilteredImages();
    return allImages.slice(0, visibleImages);
  };

  // Smart category switching - check if images are cached
  const switchCategory = (categoryKey) => {
    setActiveCategory(categoryKey);
    
    // Get images for the new category
    const categoryImages = categoryKey === 'all' 
      ? Object.values(galleryCategories).flatMap(cat => cat.images)
      : galleryCategories[categoryKey].images;
    
    // Check if all images in this category are cached
    const allImagesCached = categoryImages.every(img => cachedImages.has(img));
    
    if (allImagesCached) {
      // If all images are cached, instantly show them
      setImagesLoaded(true);
      setLoadedImages(categoryImages.length);
      setVisibleImages(12);
    } else {
      // If not all cached, reset loading state
      setVisibleImages(12);
      setLoadedImages(0);
      setImagesLoaded(false);
    }
  };

  // Load more images function
  const loadMoreImages = () => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      const allImages = getFilteredImages();
      const newVisibleCount = Math.min(visibleImages + 8, allImages.length);
      setVisibleImages(newVisibleCount);
      setIsLoadingMore(false);
    }, 300); // Reduced timeout for faster loading
  };

  const handleImageLoad = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      const currentVisibleCount = getVisibleImages().length;
      if (newCount >= currentVisibleCount) {
        setImagesLoaded(true);
      }
      return newCount;
    });
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const filteredImages = getVisibleImages();
  const allFilteredImages = getFilteredImages();
  const hasMoreImages = visibleImages < allFilteredImages.length;

  return (
    <div className="relative bg-[#fafafa] text-[#06201d] min-h-screen overflow-hidden">
      <HoverShadowBg mousePosition={mousePosition} />
      <div className="relative z-10">
        <Navbar />

      {/* Hero Section */}
      <section 
        className="py-24 px-6 text-center relative z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255,0.65), rgba(255, 255, 255, 0.65)), url(${hero})`,
        }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00796b] mb-4 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Gallery
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore a curated selection of our marble, granite, and luxury stone work captured in stunning detail.
        </motion.p>

        {/* Category Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <span className="text-sm font-medium text-gray-700">Total Projects: </span>
            <span className="text-sm font-bold text-[#00796b]">{allFilteredImages.length}</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <span className="text-sm font-medium text-gray-700">Showing: </span>
            <span className="text-sm font-bold text-[#00796b]">{filteredImages.length}</span>
          </div>
        </motion.div>
      </section>

      {/* Category Filter Tabs */}
      <section className="py-8 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* All Categories Button */}
            <button
              onClick={() => switchCategory('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-[#00796b] text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="text-lg">🏛️</span>
              <span>All ({totalImages})</span>
            </button>

            {/* Category Buttons */}
            {Object.entries(galleryCategories).map(([categoryKey, category]) => (
              <button
                key={categoryKey}
                onClick={() => switchCategory(categoryKey)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === categoryKey
                    ? 'bg-[#00796b] text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.title} ({category.images.length})</span>
              </button>
            ))}
          </motion.div>

          {/* Category Description */}
          {activeCategory !== 'all' && (
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gray-600 max-w-2xl mx-auto">
                {galleryCategories[activeCategory].description}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {!imagesLoaded && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00796b] mb-4"></div>
            <p className="text-gray-600">Loading gallery images...</p>
            <p className="text-sm text-gray-500 mt-2">{loadedImages}/{filteredImages.length} loaded</p>
          </div>
        )}
        
        <motion.div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${!imagesLoaded ? 'opacity-0' : 'opacity-100'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: imagesLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {filteredImages.map((image, idx) => (
            <motion.div
              key={image.id}
              className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: imagesLoaded ? 1 : 0, y: imagesLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: idx * 0.02 }} // Reduced delay for faster loading
              onClick={() => openImageModal(image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={`${image.categoryTitle} ${idx + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onLoad={handleImageLoad}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                    handleImageLoad();
                  }}
                  loading={cachedImages.has(image.src) ? "eager" : "lazy"}
                  style={{ 
                    imageRendering: 'high-quality',
                    opacity: cachedImages.has(image.src) ? 1 : 0.8,
                    transition: 'opacity 0.3s ease'
                  }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#00796b]/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {galleryCategories[image.category]?.icon} {image.categoryTitle}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">View Full Size</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMoreImages && imagesLoaded && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreImages}
              disabled={isLoadingMore}
              className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00796b] to-[#4db6ac] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                isLoadingMore ? 'opacity-70 cursor-not-allowed' : 'hover:from-[#006856] hover:to-[#4db6ac]'
              }`}
            >
              {isLoadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Load More Images ({allFilteredImages.length - visibleImages} remaining)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredImages.length === 0 && imagesLoaded && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No images found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative bg-black rounded-xl overflow-hidden shadow-2xl max-w-4xl max-h-[90vh] w-auto h-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{galleryCategories[selectedImage.category]?.icon}</span>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedImage.categoryTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openImageInNewTab(selectedImage.src)}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    title="Open in new tab"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button
                    onClick={closeImageModal}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    title="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Image Container - Medium Size */}
              <div className="relative flex items-center justify-center bg-black min-h-[60vh] max-h-[80vh]">
                <img
                  src={selectedImage.src}
                  alt={`${selectedImage.categoryTitle} - Full View`}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                    minWidth: '400px',
                    minHeight: '300px',
                    imageRendering: 'high-quality'
                  }}
                  loading="eager"
                />
              </div>

              {/* Modal Footer */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm text-white/80 text-center">
                  {galleryCategories[selectedImage.category]?.description}
                </p>
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
