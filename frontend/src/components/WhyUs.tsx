import React from 'react';

const WhyUs: React.FC = () => {
  return (
    <section className="py-20 bg-white mb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <div className="md:w-1/3">
            <h2 className="text-[#2979ad] font-bold text-xl mb-4">Why choose us</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Bringing the Best Talent to Your Business
            </h3>  
          </div>
          
          <div className="md:w-3/5 space-y-6">
            <p className="text-slate-600 leading-relaxed">
              We are the Leading HR service provider and one-stop center for all Career services plus advice in Rwanda.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We have developed efficient and user-friendly web-based applications for quick payroll runtime and accurate computation.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We work closely with Management to develop the right requirements, advise on appropriate compensation, and onboard the best Talent.
            </p>
          </div>
        </div>

        <div className="relative mt-20 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <img 
              src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/team_voz0d0.webp" 
              alt="Professional team" 
              className="w-full h-[400px] object-cover rounded-sm shadow-lg"
            />
            
            <div className="absolute -bottom-15 -left-5 md:-left-40 bg-[#205e87] text-white p-8 md:p-12 w-[300px] md:w-[350px] shadow-2xl z-10">
              <p className="text-lg md:text-2xl font-light leading-snug text-center">
                With our specialists, and experts at your disposal, you will face complex HR issues with confidence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;