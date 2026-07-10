// Local knowledge base for the Sundar Marbles assistant.
// Fully client-side (free) — the retriever scores these docs against the
// user's question and answers from the best match.
// To teach the bot something new, just add another entry.

const knowledgeBase = [
  {
    id: "about",
    keywords: [
      "about", "sundar", "marbles", "company", "business", "who", "history",
      "since", "years", "experience", "trust", "kya", "kon",
    ],
    answer:
      "Sundar Marbles is a premium marble, granite and mosaic tile store in Faisalabad, Pakistan, serving customers since 2008. We supply and install marble flooring, granite tiles, staircases, mosaic art and kitchen/bathroom surfaces for homes and commercial projects.",
  },
  {
    id: "location-main",
    keywords: [
      "location", "address", "where", "branch", "shop", "store", "showroom",
      "visit", "map", "directions", "chakki", "millat", "green town", "kahan",
      "faisalabad",
    ],
    answer:
      "📍 Main Branch: Chakki Stop, New Green Town, Millat Road, Faisalabad.\n📍 Sub Branch: Dhanola Saim, near Hina Sana Mill, Faisalabad.\nBoth branches are open Monday–Saturday, 9:00 AM to 6:00 PM. You can find maps on our Contact page.",
  },
  {
    id: "hours",
    keywords: [
      "hours", "timing", "time", "open", "close", "closed", "sunday",
      "monday", "saturday", "kab", "schedule",
    ],
    answer:
      "🕘 We are open Monday to Saturday, 9:00 AM – 6:00 PM. We are closed on Sundays.",
  },
  {
    id: "contact",
    keywords: [
      "contact", "phone", "number", "call", "telephone", "email", "reach",
      "rabta", "whatsapp number",
    ],
    answer:
      "📞 Phone: 041-8816900 / +92-320-6040196\n📧 Email: Talha796a@gmail.com\nYou can also use the Contact page form, or I can send a WhatsApp message or email for you right here.",
  },
  {
    id: "products-marble",
    keywords: [
      "marble", "types", "variety", "black gold", "jet black", "star black",
      "sunny white", "sunny grey", "booti seena", "taweera", "white", "black",
      "grey", "stone", "products", "stock", "available",
    ],
    answer:
      "We stock premium marble varieties including:\n• Black Gold Marble\n• Jet Black Marble\n• Star Black Marble\n• Booti Seena Marble\n• Sunny White Marble\n• Sunny Grey Marble\n• Taweera Marble\nSee photos and details on our Products page.",
  },
  {
    id: "products-granite",
    keywords: ["granite", "tropical", "slab", "counter", "countertop", "kitchen top"],
    answer:
      "We supply high-quality granite, including Tropical Grey Granite, ideal for flooring, kitchen countertops and heavy-use surfaces. Visit the Products page for current stock.",
  },
  {
    id: "prices",
    keywords: [
      "price", "prices", "rate", "rates", "cost", "kitna", "kitne", "pkr",
      "rupees", "cheap", "expensive", "budget", "quote", "quotation",
    ],
    answer:
      "Indicative prices (PKR): Black Gold ~12,000 · Jet Black ~10,500 · Tropical Grey Granite ~9,500 · Star Black ~8,500 · Booti Seena ~8,500 · Sunny Grey ~7,200 · Sunny White ~6,800 · Taweera ~5,500.\nRates change with market conditions and quantity — contact us for a confirmed quote. Want me to send your inquiry on WhatsApp?",
  },
  {
    id: "services",
    keywords: [
      "service", "services", "installation", "install", "fitting", "flooring",
      "floor", "staircase", "stairs", "mosaic", "bathroom", "vanity",
      "polish", "polishing", "cutting", "design", "lagwana",
    ],
    answer:
      "Our services include:\n• Marble & granite flooring supply and installation\n• Custom marble staircases (anti-slip finish)\n• Mosaic tile work for walls and bathrooms\n• Kitchen and bathroom surfaces\n• Marble cutting and polishing\nAll work is done by skilled craftsmen with over 15 years of experience.",
  },
  {
    id: "delivery",
    keywords: [
      "delivery", "deliver", "shipping", "transport", "lahore", "jaranwala",
      "chiniot", "jhang", "sargodha", "sheikhupura", "gojra", "samundri",
      "toba tek singh", "punjab", "city", "cities", "area", "outside",
    ],
    answer:
      "🚚 Yes! We deliver from Faisalabad to nearby cities including Lahore, Jaranwala, Chiniot, Jhang, Sargodha, Sheikhupura, Gojra, Samundri and Toba Tek Singh. Delivery charges depend on distance and order size — contact us for details.",
  },
  {
    id: "payment",
    keywords: ["payment", "pay", "cash", "bank", "transfer", "card", "installment"],
    answer:
      "💳 We accept cash and bank transfer, with prices in PKR. For large projects, discuss payment terms with our team.",
  },
  {
    id: "gallery",
    keywords: ["gallery", "photos", "pictures", "images", "work", "portfolio", "sample", "dekhna"],
    answer:
      "🖼️ You can see photos of our marble floors, staircases, mosaic work and completed projects on the Gallery page of this website.",
  },
  {
    id: "website",
    keywords: ["website", "site", "online", "order online", "domain"],
    answer:
      "🌐 Our official website is https://www.sundarmarbles.tech — browse Products and the Gallery, and use the Contact page to reach us. You can also order via WhatsApp.",
  },
];

export default knowledgeBase;
