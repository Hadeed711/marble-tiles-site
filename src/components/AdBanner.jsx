import { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    // Load the Adsterra script dynamically
    const script = document.createElement('script');
    script.src = '//pl27447986.profitableratecpm.com/1c516a7c02a6c7b80de8b302d25a2bfc/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    // Append script to document head
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="ad-banner-container py-8 px-4 text-center bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div id="container-1c516a7c02a6c7b80de8b302d25a2bfc"></div>
      </div>
    </div>
  );
}
