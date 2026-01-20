import React from 'react';

const WhyUs: React.FC = () => {
  return (
    <section className="py-20 bg-white mb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="md:w-1/3">
            <h2 className="text-[#2979ad] font-bold text-xl mb-4">Why choose us</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Bringing the Best Talent and Trusted Partners to Your Organisation
            </h3>  
          </div>
          
          <div className="md:w-3/5 space-y-6">
            <p className="text-slate-600 leading-relaxed">
              We understand African markets, cultures, and talent landscapes, enabling accurate hiring and strong, sustainable partnerships.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We use targeted sourcing, digital marketing, and relationship-driven outreach to deliver fast, high-quality results.
            </p>
            <p className="text-slate-600 leading-relaxed">
              From talent recruitment to partnership facilitation, we manage the entire process with professionalism, transparency, and impact.
            </p>
          </div>
        </div>

        <div className="relative mt-20 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <img 
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768920289/DSC_4955_-_Copy_1_szx4wp.jpg" 
              alt="Professional team" 
              className="w-full h-[400px] object-cover rounded-sm shadow-lg"
            />
            
            <div className="absolute -bottom-15 -left-5 md:-left-40 bg-[#205e87] text-white p-8 md:p-12 w-[300px] md:w-[350px] shadow-2xl z-10">
              <p className="text-lg md:text-2xl font-light leading-snug text-center">
                With our specialists and experts at your disposal, you can tackle complex recruitment and partnership challenges with confidence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;