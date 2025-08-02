import { useEffect, useState } from "react";
import ScrollToTop from "../components/ScrollToTop";

// Import all gallery images
import stairs1 from "../assets/stairs/gallery16.jpg";
import stairs2 from "../assets/stairs/gallery18.jpg";
import stairs3 from "../assets/stairs/gallery26.jpg";
import stairs4 from "../assets/stairs/gallery27.jpg";
import stairs5 from "../assets/stairs/gallery28.jpg";
import stairs6 from "../assets/stairs/gallery33.jpg";
import stairs7 from "../assets/stairs/gallery34.jpg";
import stairs8 from "../assets/stairs/gallery35.jpg";
import stairs9 from "../assets/stairs/gallery36.jpg";
import stairs10 from "../assets/stairs/gallery39.jpg";
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
import mosaic10 from "../assets/mosaic/gallery40.jpg";
import mosaic11 from "../assets/mosaic/gallery41.jpg";
import mosaic12 from "../assets/mosaic/gallery5.jpg";

// Import others images
import other1 from "../assets/others/gallery1.jpg";
import other2 from "../assets/others/gallery2.jpg";
import other3 from "../assets/others/gallery3.jpg";
import other4 from "../assets/others/gallery43.jpg";
import other5 from "../assets/others/gallery45.jpg";
import other6 from "../assets/others/gallery47.jpg";
import other7 from "../assets/others/gallery48.jpg";
import other8 from "../assets/others/gallery49.jpg";
import other9 from "../assets/others/gallery50.jpg";
import other10 from "../assets/others/gallery51.jpg";
import other11 from "../assets/others/gallery58.jpg";
import other12 from "../assets/others/gallery59.jpg";
import other13 from "../assets/others/gallery60.jpg";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [visibleImages, setVisibleImages] = useState(12);

  const BACKEND_URL = 'https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net';

  // Fallback gallery images
  const fallbackGalleryImages = [
    // Stairs collection (18 images)
    { id: 1, title: "Premium Marble Staircase Design", image: stairs1, category: { slug: "stairs", name: "Stairs" }, project_location: "Faisalabad" },
    { id: 2, title: "Elegant Staircase Installation", image: stairs2, category: { slug: "stairs", name: "Stairs" }, project_location: "Lahore" },
    { id: 3, title: "Designer Marble Stairs", image: stairs3, category: { slug: "stairs", name: "Stairs" }, project_location: "Karachi" },
    { id: 4, title: "Modern Staircase Design", image: stairs4, category: { slug: "stairs", name: "Stairs" }, project_location: "Islamabad" },
    { id: 5, title: "Luxury Stair Installation", image: stairs5, category: { slug: "stairs", name: "Stairs" }, project_location: "Faisalabad" },
    { id: 6, title: "Contemporary Marble Stairs", image: stairs6, category: { slug: "stairs", name: "Stairs" }, project_location: "Lahore" },
    { id: 7, title: "Executive Staircase Work", image: stairs7, category: { slug: "stairs", name: "Stairs" }, project_location: "Multan" },
    { id: 8, title: "Premium Stair Craftsmanship", image: stairs8, category: { slug: "stairs", name: "Stairs" }, project_location: "Rawalpindi" },
    { id: 9, title: "Elegant Marble Stairway", image: stairs9, category: { slug: "stairs", name: "Stairs" }, project_location: "Gujranwala" },
    { id: 10, title: "Designer Stair Project", image: stairs10, category: { slug: "stairs", name: "Stairs" }, project_location: "Sialkot" },
    { id: 11, title: "Modern Stair Installation", image: stairs11, category: { slug: "stairs", name: "Stairs" }, project_location: "Peshawar" },
    { id: 12, title: "Luxury Staircase Design", image: stairs12, category: { slug: "stairs", name: "Stairs" }, project_location: "Quetta" },
    { id: 13, title: "Premium Marble Stairway", image: stairs13, category: { slug: "stairs", name: "Stairs" }, project_location: "Hyderabad" },
    { id: 14, title: "Contemporary Stair Work", image: stairs14, category: { slug: "stairs", name: "Stairs" }, project_location: "Sargodha" },
    { id: 15, title: "Executive Staircase", image: stairs15, category: { slug: "stairs", name: "Stairs" }, project_location: "Bahawalpur" },
    { id: 16, title: "Designer Marble Stairs", image: stairs16, category: { slug: "stairs", name: "Stairs" }, project_location: "Sukkur" },
    { id: 17, title: "Elegant Stair Installation", image: stairs17, category: { slug: "stairs", name: "Stairs" }, project_location: "Larkana" },
    { id: 18, title: "Modern Staircase Project", image: stairs18, category: { slug: "stairs", name: "Stairs" }, project_location: "Mardan" },

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
    { id: 48, title: "Designer Mosaic Installation", image: mosaic10, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Sialkot" },
    { id: 49, title: "Contemporary Mosaic Work", image: mosaic11, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Peshawar" },
    { id: 50, title: "Elegant Mosaic Pattern", image: mosaic12, category: { slug: "mosaic", name: "Mosaic" }, project_location: "Quetta" },

    // Others collection (13 images)
    { id: 51, title: "Custom Marble Work", image: other1, category: { slug: "others", name: "Others" }, project_location: "Faisalabad" },
    { id: 52, title: "Decorative Stone Installation", image: other2, category: { slug: "others", name: "Others" }, project_location: "Lahore" },
    { id: 53, title: "Premium Stone Work", image: other3, category: { slug: "others", name: "Others" }, project_location: "Karachi" },
    { id: 54, title: "Elegant Marble Feature", image: other4, category: { slug: "others", name: "Others" }, project_location: "Islamabad" },
    { id: 55, title: "Designer Stone Pattern", image: other5, category: { slug: "others", name: "Others" }, project_location: "Faisalabad" },
    { id: 56, title: "Contemporary Marble Art", image: other6, category: { slug: "others", name: "Others" }, project_location: "Lahore" },
    { id: 57, title: "Luxury Stone Installation", image: other7, category: { slug: "others", name: "Others" }, project_location: "Multan" },
    { id: 58, title: "Artistic Marble Design", image: other8, category: { slug: "others", name: "Others" }, project_location: "Rawalpindi" },
    { id: 59, title: "Premium Stone Craftsmanship", image: other9, category: { slug: "others", name: "Others" }, project_location: "Gujranwala" },
    { id: 60, title: "Executive Marble Work", image: other10, category: { slug: "others", name: "Others" }, project_location: "Sialkot" },
    { id: 61, title: "Designer Stone Feature", image: other11, category: { slug: "others", name: "Others" }, project_location: "Peshawar" },
    { id: 62, title: "Modern Marble Installation", image: other12, category: { slug: "others", name: "Others" }, project_location: "Quetta" },
    { id: 63, title: "Elegant Stone Pattern", image: other13, category: { slug: "others", name: "Others" }, project_location: "Hyderabad" },
  ];

  const fallbackCategories = [
    { id: "all", name: "All", icon: "🏛️" },
    { id: "mosaic", name: "Mosaic", icon: "🎨" },
    { id: "floors", name: "Floors", icon: "🏢" },
    { id: "stairs", name: "Stairs", icon: "🪜" },
    { id: "others", name: "Others", icon: "🔹" },
  ];

  // Fetch gallery data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch gallery images
        const imagesResponse = await fetch(`${BACKEND_URL}/api/gallery/images/`);
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          const backendImages = imagesData.results || imagesData;
          
          if (backendImages && backendImages.length > 0) {
            setGalleryImages(backendImages);
          } else {
            setGalleryImages(fallbackGalleryImages);
          }
        } else {
          setGalleryImages(fallbackGalleryImages);
        }

        // Try to fetch categories
        const categoriesResponse = await fetch(`${BACKEND_URL}/api/gallery/categories/`);
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData && categoriesData.length > 0) {
            const allowedCategories = ['mosaic', 'floors', 'stairs', 'others'];
            const filteredCategories = categoriesData.filter(cat => 
              allowedCategories.includes(cat.slug.toLowerCase()) || 
              allowedCategories.includes(cat.name.toLowerCase())
            );
            
            const formattedCategories = [
              { id: "all", name: "All", icon: "🏛️" },
              ...filteredCategories
                .sort((a, b) => {
                  const order = ['mosaic', 'floors', 'stairs', 'others'];
                  const aIndex = order.indexOf(a.slug.toLowerCase());
                  const bIndex = order.indexOf(b.slug.toLowerCase());
                  return aIndex - bIndex;
                })
                .map(cat => ({ 
                  id: cat.slug, 
                  name: cat.name,
                  icon: getCategoryIcon(cat.name)
                }))
            ];
            setCategories(formattedCategories);
          } else {
            setCategories(fallbackCategories);
          }
        } else {
          setCategories(fallbackCategories);
        }

      } catch (error) {
        console.log('Error fetching gallery, using fallback:', error);
        setGalleryImages(fallbackGalleryImages);
        setCategories(fallbackCategories);
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
      'Mosaic': '🎨',
      'Others': '🔹'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-amber-400">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Explore our finest marble and stone installations across Pakistan
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setVisibleImages(12);
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found for this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedImages.map((image) => (
                  <div
                    key={image.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.image}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        📍 {image.project_location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {displayedImages.length < filteredImages.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-300 font-semibold"
                  >
                    Load More Images
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="max-w-4xl max-h-full relative">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              ✕
            </button>
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
              <h3 className="text-xl font-semibold">{lightboxImage.title}</h3>
              <p className="text-gray-300">📍 {lightboxImage.project_location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
