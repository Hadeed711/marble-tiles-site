import { motion } from "framer-motion";

export default function Card({ image, name, description, onImageClick }) {
  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering ${name}! Please provide more details.`;
    const whatsappUrl = `https://wa.me/923206040196?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-xl shadow-lg border border-[#e0e0e0] overflow-hidden relative transition-all duration-300 hover:shadow-2xl h-full flex flex-col max-w-xs sm:max-w-sm mx-auto"
    >
      {/* Image Section */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={() => onImageClick && onImageClick(image, name)}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-44 sm:h-56 object-cover group-hover:brightness-110 transition-all duration-300"
        />
      </motion.div>

      {/* Marble Info - Flexible content area */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-bold text-[#00796b] tracking-wide line-clamp-2">{name}</h3>
          {description && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 min-h-[2.75rem] sm:min-h-[3.75rem]">{description}</p>
          )}
        </div>

        {/* Button - Always at bottom */}
        <motion.button
          onClick={handleWhatsAppOrder}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#25D366",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mt-3 sm:mt-4 w-full py-2 px-3 sm:px-4 bg-[#00796b] hover:bg-[#25D366] text-white font-medium text-xs sm:text-sm rounded-lg shadow-md tracking-wider transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
          </svg>
          Order Now
        </motion.button>
      </div>

      {/* Decorative futuristic glowing bar */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#00796b] via-[#d4af37] to-[#00796b] animate-pulse blur-sm"></div>
    </motion.div>
  );
}
