import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/business_black_gfgtd9.jpg", 
  "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/employment_black_hwpbg8.jpg", 
  "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/hr2_hpfjui.webp"
];

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen max-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/20 z-10" /> 
          <img
            src={img}
            alt="Workplace"
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      <div className="relative z-20 w-full max-w-3xl mx-auto px-6">
        <div className="bg-black/50 border border-white/20 p-10 md:p-14 text-center shadow-2xl">
          
          <h1 className="text-2xl md:text-2xl font-light text-white mb-6 tracking-wide uppercase">
            Find the <span className="font-bold">Right Pool</span> of Talent and Partnerships in africa and Wordwide.
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-10">
            Connecting exceptional candidates & Strategic partners with world-class opportunities. 
            Whether you're hiring or seeking strategic partnership in Africa or world wide, we make the match seamless.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/opportunities">
            <button className="bg-white text-black px-10 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors uppercase text-sm tracking-widest cursor-pointer">
              Browse Opportunities
            </button>

            </Link>

            <Link to="/contact">
                <button className="bg-transparent border border-white text-white px-10 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors uppercase text-sm tracking-widest cursor-pointer">
                Contact Us
                </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;