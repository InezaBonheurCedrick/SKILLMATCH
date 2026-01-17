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
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/business_black_gfgtd9.jpg" 
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
            <strong className="text-[#2b6cb0]">RightPool</strong> is a Rwandan private company created in 2024. We are the leading IT-based Human Resource Agency in the country. Our main platform 
            <a href="https://www.jobinrwanda.com" className="text-[#2b6cb0] font-semibold hover:underline px-1">www.rightpool.com</a> 
            has facilitated the creation of our recruitment database, which now contains over 420,000 profiles from various sectors and levels.
          </p>

          <p>
            We are keen adopters and implementers of innovative HR and Recruitment procedures. We believe in deploying timely and user-friendly solutions to solve the current market HR and Recruitment challenges faced by our clients and candidates.
          </p>

          <p>
            We have created an effective technological solution to ensure timely and high-quality deliverables. As a result, lead times are reduced, candidates are more motivated, retention rates are higher, and your organization's potential is unlocked!
          </p>

          <p>
            On top of our platform and systems, we have a strong reputation among HR Specialists, Professionals, and Job Seekers in Rwanda, East Africa, and around the world.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;