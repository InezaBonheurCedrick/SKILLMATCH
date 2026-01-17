import React from 'react';
import { Link } from 'react-router-dom';

const BusinessServices: React.FC = () => {
  const services = [
    {
      title: "Shortlisting",
      tagline: "Simplify your screening process after advertising on our portal.",
      description: "We publish on your behalf with your company description or under our company for recruitment confidentiality on our job portal plus social media platforms (LinkedIn, Twitter, Facebook, and Instagram) for 7 to 15 days. We extract all received applications from our portal at the deadline and begin the screening process, where we shortlist the best 10 to 15 candidates based on the criteria within 2 to 3 working days.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/business_black_gfgtd9.jpg"
    },
    {
      title: "CVs on Request",
      tagline: "Instant access to a pool of qualified professionals tailored to your needs.",
      description: "Gain access to our extensive database of over 420,000 profiles. We provide tailored CV collections that match your specific job requirements immediately, allowing you to move straight to the interview stage with pre-vetted talent.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660425/team_2_g1yj9n.webp"
    },
    {
      title: "Full Recruitment",
      tagline: "End-to-end talent acquisition process managed by our HR experts.",
      description: "From job profiling to final selection, we manage the entire recruitment lifecycle. Our experts handle sourcing, technical assessments, and cultural fit interviews to ensure you get top-tier talent that aligns with your organization's goals.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660424/black_happy_pexjw7.jpg"
    },
    {
      title: "Temporary Staffing",
      tagline: "Flexible workforce solutions for your short-term staffing needs.",
      description: "Whether you need coverage for parental leave, special projects, or seasonal peaks, our temporary staffing solutions provide you with pre-screened professionals ready to contribute immediately to your operational success.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/recruitment_nriehd.webp"
    },
    {
      title: "Employee Outsourcing",
      tagline: "Simplify HR management and focus on your core objectives.",
      description: "We handle contracts, compliance, and HR administration for outsourced staff. This allows your organization to remain agile and focused on its core mission while we take care of the complex legal and administrative responsibilities of your workforce.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/team_voz0d0.webp"
    },
    {
      title: "HR Advisory Services",
      tagline: "Strategic HR guidance to optimize your organizational performance.",
      description: "Our consultants provide strategic advice on labor laws, organizational design, and performance management systems. We help you build a more effective, compliant, and motivated HR department that drives business growth.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/hr2_hpfjui.webp"
    },
    {
      title: "Payroll Management",
      tagline: "Accurate, timely, and compliant payroll solutions for your business.",
      description: "Utilizing our advanced web-based applications, we ensure accurate computation and timely runtime. We manage all statutory deductions and local tax compliance, reducing your administrative burden and ensuring employee satisfaction.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660424/hr_w0vk2w.webp"
    },
    {
      title: "Job Fair Organization",
      tagline: "Connect with mass talent through well-organized recruitment events.",
      description: "We organize large-scale recruitment events that allow you to meet hundreds of potential candidates in a single day. This is perfect for mass hiring needs or building significant brand awareness within the local labor market.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660425/job_fair_tvhgf8.jpg"
    },
    {
      title: "Labour Market Survey",
      tagline: "Data-driven insights for competitive and strategic HR planning.",
      description: "Stay ahead with our comprehensive surveys on salary benchmarks, benefits, and market trends in Rwanda. These insights help you make informed decisions for talent retention and recruitment strategies.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660424/hr00_l5nb18.webp"
    }
  ];

  return (
    <div className="bg-white font-sans">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        <div className="text-center mb-20 md:mb-32">
          <h1 className="text-3xl md:text-3xl font-bold text-[#2b6cb0]">
            Solutions for Businesses
          </h1>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
            >
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#2979ad] mb-4">
                    {service.title}
                  </h2>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-8 bg-[#2b6cb0] rounded-full mt-1 shrink-0" />
                    <p className="text-base text-slate-600 italic leading-snug">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-8 text-sm md:text-base">
                  {service.description}
                </p>

                <Link to="/contact">
                    <button className="bg-[#2b6cb0] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#205f88] transition-all shadow-md hover:shadow-lg active:scale-95 text-sm uppercase cursor-pointer">
                    Order Now
                    </button>
                </Link>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="overflow-hidden shadow-xl ">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-[280px] md:h-[350px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BusinessServices;