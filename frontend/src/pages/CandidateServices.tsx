import React from 'react';
import { Link } from 'react-router-dom';

const CandidateServices: React.FC = () => {
  const categories = [
    {
      title: "Looking to expand your business in Africa",
      description: "Find your opportunity and partnership with us.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1776963799/Image_fx_42_jijmuv.jpg",
      alt: "Expand your business"
    },
    {
      title: "Expansion Opportunities opportunities",
      description: "Business development & Expansion Opportunities.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1776964021/pexels-rdne-7947838_jxcx7k.jpg",
      alt: "Internship opportunities"
    },
    {
      title: "Market Research",
      description: "We do market research to find your ideal business location.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1776963681/Image_fx_36_myyxpq.jpg",
      alt: "Perfect business location"
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
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1776963514/Image_fx_50_bvqu7v.jpg" 
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