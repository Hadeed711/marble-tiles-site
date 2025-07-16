import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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

  const handleSubmit = (e) => {
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
    setTimeout(() => {
      const mailto = `mailto:hadeedahmad711@gmail.com?subject=Marble Inquiry&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AMessage: ${formData.message}`;
      window.location.href = mailto;
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-[#333] overflow-hidden">
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
          ✅ Message prepared! Check your mail client.
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
                  placeholder="example@email.com"
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
          </div>

          <div className="space-y-8 mt-40">
            <div className="bg-white shadow-xl rounded-xl p-6 transition duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-[#00796b] mb-2">
                Main Branch
              </h3>
              <p className="text-[#444]">
                Sundar Marbles, Near Samundri Road, Faisalabad
              </p>
              <p className="text-sm text-[#666]">Tel: 041-1234567</p>
              <p className="text-sm text-[#666]">
                Email: main@sundarmarbles.com
              </p>
              <a
                href="https://maps.google.com"
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
                Sundar Marbles Outlet, D-Ground, Faisalabad
              </p>
              <p className="text-sm text-[#666]">Tel: 041-7654321</p>
              <p className="text-sm text-[#666]">
                Email: outlet@sundarmarbles.com
              </p>
              <a
                href="https://maps.google.com"
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
