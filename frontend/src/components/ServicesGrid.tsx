import React from 'react';

interface Service {
  id: number;
  title: string;
  image: string;
}

const ServicesGrid: React.FC = () => {
  const services: Service[] = [
    { id: 1, title: "Shortlistings", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/Shortlistings_rohmwb.webp" },
    { id: 2, title: "CVs on Request", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658815/CVs_on_Request_h31yyo.webp" },
    { id: 3, title: "Full recruitment", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/Full_recruitment_ret9ws.webp" },
    { id: 4, title: "Temporary Staffing", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/Temporary_Staffing_qobdzu.webp" },
    { id: 5, title: "partnership sourcing", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/Employee_Outsourcing_p2gcqx.webp" },
    { id: 6, title: "HR Advisory Services", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/HR_Advisory_Services_d6bjt9.webp" },
    { id: 7, title: "Payroll Management", image: "https://cdn-icons-png.flaticon.com/512/2660/2660505.png" },
    { id: 8, title: "Job Fair Organization", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/Job_Fair_organization_kdhl9e.webp" },
    { id: 9, title: "Labour Market Survey", image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/Labour_Market_Survey_wpzdwp.webp" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#2979ad] font-bold text-lg uppercase tracking-widest mb-2">Our Services</h2>
          <div className="h-1 w-12 bg-[#2979ad] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white border border-gray-100 p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <h3 className="text-slate-700 font-semibold text-sm md:text-base tracking-wide uppercase group-hover:text-[#2979ad] transition-colors">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;