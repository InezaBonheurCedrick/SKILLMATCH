import React from 'react';
import { Link } from 'react-router-dom';

const CandidateServices: React.FC = () => {
  const categories = [
    {
      title: "Looking for a job",
      description: "Find your dream job with us.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660072/hr-hiring-recruit-jobhuman-resource-searching-job-business-conceptmagnifier-glass-with-text_74054-1764_hvfk1c.avif",
      alt: "Find your dream job"
    },
    {
      title: "Internship opportunities",
      description: "Internship opportunities in software & mobile development.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660072/66fc0f889e106_jorm98.png",
      alt: "Internship opportunities"
    },
    {
      title: "Residential property",
      description: "Residential property solutions and relocation services.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660072/property-home-sale-real-estate-social-media-post-banner-template_467913-262_txowae.avif",
      alt: "Residential property"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2b6cb0]">
            Solutions for Individuals
          </h1>
        </div>

        <div className="relative mb-[200px] flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-2/3 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/business_black_gfgtd9.jpg" 
              alt="Candidates collaborating" 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 md:absolute md:right-0 bg-white p-8 md:p-10 md:bottom-[-80px] shadow-xl border border-gray-100 rounded-lg z-10">
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              Whether you're on the lookout for the perfect job that aligns with your career goals, seeking an internship that propels you into the world of software development, in need of a residential house, or considering a stress-free relocation to the country of a thousand hills and a million smiles, we've got you covered!
            </p>
            <p className="font-bold text-slate-800 text-sm">
              Click on the service photo to get more information regarding it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {categories.map((item, index) => (
            <div key={index} className="flex flex-col items-center">

              <Link to="/opportunities">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer w-full max-w-[320px] aspect-square flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="text-center mt-6">
                <h3 className="text-[#2b6cb0] font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm max-w-[220px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CandidateServices;