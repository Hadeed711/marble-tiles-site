import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import Loader from "../components/Loader";
import HoverShadowBg from "../components/HoverShadowBg";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setLoading(false);
      setError("Message could not be sent. Please try again or call us directly.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-[#333] overflow-hidden">
      <Seo
        title="Contact Us – Get a Free Quote | Sundar Marbles Faisalabad"
        description="Contact Sundar Marbles for a free quote on marble flooring, granite, staircases and mosaic work in Faisalabad, Lahore and nearby cities. Visit us at Chakki Stop, Millat Road, Faisalabad or call +92-320-6040196."
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
          ✅ Message sent successfully! We will get back to you soon.
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

            <motion.form
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-xl"
            >
              <div>
                <label htmlFor="contact-name" className="text-sm text-[#00796b] font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm text-[#00796b] font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
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
                <label htmlFor="contact-message" className="text-sm text-[#00796b] font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Interested in marble flooring, granite or mosaic work? Tell us about your project..."
                  rows={6}
                  className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#00796b]"
                  required
                ></textarea>
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00796b] text-white px-8 py-3 rounded-full hover:bg-[#d4af37] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </motion.form>
          </div>

          <div className="space-y-8 md:mt-40">
            <div className="bg-white shadow-xl rounded-xl p-6 transition duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-[#00796b] mb-2">
                Main Branch
              </h3>
              <p className="text-[#444]">
                Chakki Stop, New Green Town, Millat Road, Faisalabad
              </p>
              <p className="text-sm text-[#666]">Tel: 041-8816900</p>
              <p className="text-sm text-[#666]">
                Email: Talha796a@gmail.com
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
                Email: Talha796a@gmail.com
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
