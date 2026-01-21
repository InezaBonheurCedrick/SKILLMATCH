import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b6cb0] inline-block pb-2">
            About Us
          </h1>
        </div>

        <div className="relative mb-24 flex justify-center h-[350px] md:h-[500px]">
          <div className="absolute left-0 top-0 w-[55%] h-[300px] md:h-[400px] z-0">
            <img 
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1769003558/_green_Pic_jwqre8.png" 
              alt="Team Meeting" 
              className="w-full h-full object-cover rounded-sm shadow-lg"
            />
          </div>
          
          <div className="absolute right-10 bottom-0 w-[50%] h-[250px] md:h-[350px] z-10 shadow-2xl overflow-hidden rounded-sm">
            <img 
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/hr2_hpfjui.webp" 
              alt="Partnership Handshake" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
          <p className="text-lg">
            <strong className="text-[#2b6cb0]">RightPool</strong> RightPool is a Rwandan private company founded in 2026, specializing in talent recruitment and strategic partnership sourcing across Africa and the world. Through our flagship platform 
            <a href="https://www.jobinrwanda.com" className="text-[#2b6cb0] font-semibold hover:underline px-1">www.rightpool.com</a> 
            .
          </p>

          <p>
            We are innovators in Partnership Sourcing and recruitment, implementing modern, technology-driven solutions that are timely, efficient, and user-friendly. Our goal is to address the evolving talent and partnership needs of organizations and candidates worldwide.
          </p>

          <p>
            With our advanced technological solutions, we ensure high-quality deliverables with reduced lead times, more motivated candidates, improved retention rates, and maximized organizational potential!
          </p>

          <p>
            RightPool has earned a trusted reputation among Partnership sourcing specialists, professionals, and job seekers in Rwanda, across East Africa, and internationally. We are committed to connecting organizations with the right talent and strategic partners to accelerate growth and success globally.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;