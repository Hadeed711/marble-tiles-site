import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import SplashLoader from "./components/SplashLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.7s (2s for loader + 0.7s for fade out)
    const timer = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashLoader />
      <div style={{ opacity: loading ? 0.15 : 1, transition: "opacity 0.7s" }}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;