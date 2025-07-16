import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HoverShadowBg from "../components/HoverShadowBg";
import slider1 from "../assets/slider1.jpg";
import hero from "../assets/hero_img1.jpg";

export default function Gallery() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);

  const galleryImages = [
    slider1,
    slider1,
    slider1,
    slider1,
    slider1,
    slider1,
    slider1,
    slider1,
  ];

  const handleImageLoad = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      if (newCount >= galleryImages.length) {
        setImagesLoaded(true);
      }
      return newCount;
    });
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
          className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore a curated selection of our marble, granite, and luxury stone work captured in stunning detail.
        </motion.p>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {!imagesLoaded && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00796b]"></div>
          </div>
        )}
        
        <motion.div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${!imagesLoaded ? 'opacity-0' : 'opacity-100'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: imagesLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {galleryImages.map((imgUrl, idx) => (
            <motion.div
              key={idx}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: imagesLoaded ? 1 : 0, y: imagesLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => openImageInNewTab(imgUrl)}
            >
              <img
                src={imgUrl}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                onLoad={handleImageLoad}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                  handleImageLoad();
                }}
                loading="eager"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
