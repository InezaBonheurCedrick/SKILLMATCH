import React, { useState, useEffect } from 'react';

const partnerImages = [
  "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/Frame_21_3_xxjwew.webp",
  "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/download_bo3ypf.png"
];

const Partners: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === partnerImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-[#2b6cb0] text-2xl md:text-3xl font-bold mb-12">
          Companies we work with
        </h2>

        <div className="relative h-24 md:h-32 flex justify-center items-center overflow-hidden">
          {partnerImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-full max-w-6xl px-4">
                <img 
                  src={img} 
                  alt={`Partners Set ${index + 1}`} 
                  className="w-full h-auto max-h-24 md:max-h-32 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {partnerImages.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentIndex ? 'w-8 bg-[#2b6cb0]' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;