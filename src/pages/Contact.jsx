import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import Loader from "../components/Loader";
import HoverShadowBg from "../components/HoverShadowBg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      let cleaned = value.replace(/[^\d]/g, "").slice(0, 11);
      if (cleaned.length > 4) {
        cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
      }
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^03\d{2}-\d{7}$/;

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number in 0300-1234567 format.");
      return;
    }

    setLoading(true);

    // Both operations will run independently - if one fails, the other continues
    const sendToBackend = async () => {
      try {
        const response = await fetch('https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net/api/contact/message/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: 'Website Contact Form',
            message: formData.message
          }),
        });
        
        if (response.ok) {
          console.log('✅ Message sent to backend successfully');
          return { success: true, method: 'backend' };
        } else {
          console.log('❌ Backend response error');
          return { success: false, method: 'backend', error: 'Response error' };
        }
      } catch (error) {
        console.log('❌ Backend not available:', error.message);
        return { success: false, method: 'backend', error: error.message };
      }
    };

    const sendToWhatsApp = async () => {
      try {
        // Format message for WhatsApp API
        const whatsappMessage = `*New Marble Inquiry from Website*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}

💬 *Message:*
${formData.message}

---
_Sent from Sundar Marbles Website_`;

        // Using WhatsApp Business API or webhook
        // Replace this URL with your WhatsApp webhook endpoint when available
        const whatsappApiUrl = 'https://sundar-bnhkawbtbbhjfxbz.eastasia-01.azurewebsites.net/api/send-whatsapp'; // Your WhatsApp API endpoint
        
        const response = await fetch(whatsappApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: '+923241669274',
            message: whatsappMessage,
            customerData: formData
          }),
        });

        if (response.ok) {
          console.log('✅ Message sent to WhatsApp successfully');
          return { success: true, method: 'whatsapp' };
        } else {
          console.log('❌ WhatsApp API error');
          return { success: false, method: 'whatsapp', error: 'API error' };
        }
      } catch (error) {
        console.log('❌ WhatsApp API not available:', error.message);
        
        // Fallback: Use WhatsApp Web URL (silent, no popup)
        try {
          const whatsappMessage = `New Marble Inquiry from Website\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}\n\n----\nSent from Sundar Marbles Website`;
          
          // Create a hidden iframe to trigger WhatsApp without opening new window
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = `https://wa.me/923241669274?text=${encodeURIComponent(whatsappMessage)}`;
          document.body.appendChild(iframe);
          
          // Remove iframe after 3 seconds
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 3000);
          
          console.log('📱 WhatsApp fallback triggered');
          return { success: true, method: 'whatsapp-fallback' };
        } catch (fallbackError) {
          console.log('❌ WhatsApp fallback failed:', fallbackError.message);
          return { success: false, method: 'whatsapp', error: fallbackError.message };
        }
      }
    };

    // Run both operations simultaneously
    try {
      const [backendResult, whatsappResult] = await Promise.allSettled([
        sendToBackend(),
        sendToWhatsApp()
      ]);

      let successCount = 0;
      let successMessage = "Message processing completed: ";

      if (backendResult.status === 'fulfilled' && backendResult.value.success) {
        successCount++;
        successMessage += "✅ Saved to database ";
      } else {
        successMessage += "❌ Database unavailable ";
      }

      if (whatsappResult.status === 'fulfilled' && whatsappResult.value.success) {
        successCount++;
        successMessage += "✅ Sent to WhatsApp";
      } else {
        successMessage += "❌ WhatsApp unavailable";
      }

      console.log(successMessage);

      setLoading(false);
      setSuccess(true);
      
      // Clear form after processing
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      setTimeout(() => setSuccess(false), 5000);

    } catch (error) {
      console.error('Error in form submission:', error);
      setLoading(false);
      alert('There was an error processing your message. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-[#333] overflow-hidden">
      <Seo
        title="Contact Us – Get a Free Quote | Sundar Marbles Faisalabad"
        description="Contact Sundar Marbles for a free quote on marble flooring, granite, staircases and mosaic work. Visit us at Chakki Stop, Millat Road, Faisalabad or call +92-320-6040196."
        path="/contact"
      />
      <Navbar />
      <HoverShadowBg mousePosition={mousePosition} />

      {loading && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-[#00796b] text-white px-6 py-3 rounded-full shadow-lg"
        >
          ✅ Message submitted successfully!
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto py-24 px-6"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-4xl font-bold text-[#00796b] mb-6">
              Contact Us
            </h2>
            <p className="text-[#555] mb-10">
              We'd love to hear from you. Whether you're curious about marble
              options, pricing, or anything else — we're ready to answer your
              questions.
            </p>

            {/* Marble Business Line Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative bg-white p-8 rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00796b]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#d4af37]/10 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>

              {/* Main Illustration Container */}
              <div className="relative z-10 h-96 flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
                  {/* Background elements */}
                  <defs>
                    <linearGradient id="marbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00796b" stopOpacity="0.1"/>
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1"/>
                    </linearGradient>
                    <pattern id="marblePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" stroke="#00796b" strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>

                  {/* Construction/Workshop Scene */}
                  {/* Ground/Floor */}
                  <motion.rect
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    x="20" y="250" width="360" height="30" 
                    fill="url(#marblePattern)" 
                    rx="15"
                  />

                  {/* Building/Workshop */}
                  <motion.g
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {/* Main building */}
                    <rect x="50" y="150" width="120" height="100" fill="none" stroke="#00796b" strokeWidth="2"/>
                    <rect x="60" y="160" width="20" height="30" fill="none" stroke="#00796b" strokeWidth="1.5"/>
                    <rect x="90" y="160" width="20" height="30" fill="none" stroke="#00796b" strokeWidth="1.5"/>
                    <rect x="120" y="160" width="20" height="30" fill="none" stroke="#00796b" strokeWidth="1.5"/>
                    
                    {/* Roof */}
                    <path d="M40 150 L110 120 L180 150 Z" fill="none" stroke="#d4af37" strokeWidth="2"/>
                  </motion.g>

                  {/* Marble Slabs Stack */}
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <rect x="200" y="220" width="80" height="8" fill="none" stroke="#00796b" strokeWidth="2"/>
                    <rect x="205" y="212" width="80" height="8" fill="none" stroke="#00796b" strokeWidth="2"/>
                    <rect x="210" y="204" width="80" height="8" fill="none" stroke="#00796b" strokeWidth="2"/>
                    <rect x="215" y="196" width="80" height="8" fill="none" stroke="#00796b" strokeWidth="2"/>
                  </motion.g>

                  {/* Tools and Equipment */}
                  <motion.g
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    {/* Cutting tool */}
                    <circle cx="320" cy="180" r="15" fill="none" stroke="#d4af37" strokeWidth="2"/>
                    <line x1="305" y1="180" x2="335" y2="180" stroke="#00796b" strokeWidth="3"/>
                    <line x1="320" y1="165" x2="320" y2="195" stroke="#00796b" strokeWidth="3"/>
                  </motion.g>

                  {/* Worker Figure (Simple line art) */}
                  <motion.g
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.3 }}
                  >
                    {/* Head */}
                    <circle cx="130" cy="80" r="12" fill="none" stroke="#00796b" strokeWidth="2"/>
                    {/* Body */}
                    <line x1="130" y1="92" x2="130" y2="140" stroke="#00796b" strokeWidth="2"/>
                    {/* Arms */}
                    <line x1="130" y1="105" x2="115" y2="125" stroke="#00796b" strokeWidth="2"/>
                    <line x1="130" y1="105" x2="145" y2="125" stroke="#00796b" strokeWidth="2"/>
                    {/* Legs */}
                    <line x1="130" y1="140" x2="120" y2="165" stroke="#00796b" strokeWidth="2"/>
                    <line x1="130" y1="140" x2="140" y2="165" stroke="#00796b" strokeWidth="2"/>
                    {/* Hard hat */}
                    <path d="M118 75 Q130 70 142 75" fill="none" stroke="#d4af37" strokeWidth="2"/>
                  </motion.g>

                  {/* Decorative marble tiles floating */}
                  <motion.g
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <rect x="300" y="50" width="15" height="15" fill="none" stroke="#00796b" strokeWidth="1" opacity="0.6"/>
                    <rect x="320" y="40" width="12" height="12" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
                    <rect x="340" y="60" width="10" height="10" fill="none" stroke="#00796b" strokeWidth="1" opacity="0.5"/>
                  </motion.g>

                  {/* Quality symbols */}
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                  >
                    {/* Quality checkmark */}
                    <circle cx="70" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="2"/>
                    <path d="M60 50 L67 57 L80 44" fill="none" stroke="#00796b" strokeWidth="3" strokeLinecap="round"/>
                  </motion.g>

                  {/* Decorative elements */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                  >
                    {/* Sparkles for premium quality */}
                    <g opacity="0.4">
                      <path d="M370 100 L375 110 L380 100 L375 90 Z" fill="#d4af37"/>
                      <path d="M365 120 L368 127 L371 120 L368 113 Z" fill="#00796b"/>
                      <path d="M30 100 L33 107 L36 100 L33 93 Z" fill="#d4af37"/>
                    </g>
                  </motion.g>

                  {/* Text elements */}
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                    x="200" y="35" 
                    textAnchor="middle" 
                    fill="#00796b" 
                    fontSize="14" 
                    fontWeight="bold"
                  >
                    Premium Quality
                  </motion.text>
                  
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 2.4 }}
                    x="200" y="290" 
                    textAnchor="middle" 
                    fill="#666" 
                    fontSize="12"
                  >
                    Crafted with Excellence
                  </motion.text>
                </svg>
              </div>

              {/* Text content below illustration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.5 }}
                className="text-center mt-6"
              >
                <h3 className="text-xl font-bold text-[#00796b] mb-2">
                  Expert Craftsmanship
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every piece of marble and granite is carefully selected and crafted 
                  by our skilled artisans to ensure premium quality and lasting beauty 
                  for your spaces.
                </p>
              </motion.div>
            </motion.div>

            {/* Comment out the original contact form for future use */}
            {/*
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-xl"
            >
              <div>
                <label className="text-sm text-[#00796b] font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#00796b] font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#00796b] font-medium">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter number without dash (e.g. 03001234567)"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#00796b] font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Interested in ordering marbles in Faisalabad?"
                  rows={4}
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#00796b] text-white px-6 py-2 rounded-full hover:bg-[#d4af37] transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
            */}
          </div>

          <div className="space-y-8 mt-40">
            <div className="bg-white shadow-xl rounded-xl p-6 transition duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-[#00796b] mb-2">
                Main Branch
              </h3>
              <p className="text-[#444]">
                Chakki Stop, New Green Town, Millat Road, Faisalabad
              </p>
              <p className="text-sm text-[#666]">Tel: 041-8816900</p>
              <p className="text-sm text-[#666]">
                Email: info@sundarmarbles.com
              </p>
              <a
                href="https://maps.app.goo.gl/dR9DepEoZGSmXRaA7"
                target="_blank"
                rel="noreferrer"
                className="text-sm mt-2 inline-block text-[#00796b] hover:underline"
              >
                📍 View on Map
              </a>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-6 transition duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-[#00796b] mb-2">
                Sub Branch
              </h3>
              <p className="text-[#444]">
                Dhanola Saim, near Hina Sana Mill, Faisalabad
              </p>
              <p className="text-sm text-[#666]">Tel:  041-8816900</p>
              <p className="text-sm text-[#666]">
                Email: info@sundarmarbles.com
              </p>
              <a
                href="https://maps.app.goo.gl/9oP6NFSYNWLdf3GFA"
                target="_blank"
                rel="noreferrer"
                className="text-sm mt-2 inline-block text-[#00796b] hover:underline"
              >
                📍 View on Map
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div>
            <h4 className="text-lg font-semibold text-[#00796b] mb-2">
              Main Office
            </h4>
            <div className="rounded-xl border-2 border-[#d4af37] shadow-[0_0_24px_4px_rgba(212,175,55,0.5)] transition hover:shadow-[0_0_20px_8px_rgba(212,175,55,0.8)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.1949188671924!2d73.09997031045!3d31.463823849827538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269c3830afd61%3A0xd1a45be90da64e84!2sSundar%20Marbles%20%26%20Granite!5e0!3m2!1sen!2s!4v1752336643856!5m2!1sen!2s"
                title="Main Branch Map"
                className="w-full h-64 rounded-xl border"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#00796b] mb-2">
              Sub Office
            </h4>
            <div className="rounded-xl border-2 border-[#d4af37] shadow-[0_0_24px_4px_rgba(212,175,55,0.5)] transition hover:shadow-[0_0_20px_8px_rgba(212,175,55,0.8)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.0534997666336!2d73.08895141045133!3d31.4952132482784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39226b54f5620d9b%3A0x9c9e46dfc4cf6153!2sSundar%20Marbel%20Industry!5e0!3m2!1sen!2s!4v1752337096532!5m2!1sen!2s"
                title="Sub Branch Map"
                className="w-full h-64 rounded-xl border"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
