import React from 'react';

const MissionBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
      <img 
        src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/recruitment_nriehd.webp" 
        alt="Partnership Handshake"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-black/40 border border-white/10 py-8 px-5 md:px-15 max-w-3xl w-full text-center">
          <h2 className="text-white text-2xl md:text-3xl font-light tracking-wide leading-tight">
            Focus on Your Mission
          </h2>
          <div className="h-[1px] w-24 bg-white/30 mx-auto my-4" />
          <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide leading-tight">
            While We Focus on Your Recruitment & Partnership Sourcing.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MissionBanner;