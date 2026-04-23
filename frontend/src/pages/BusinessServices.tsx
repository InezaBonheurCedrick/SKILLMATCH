import React from 'react';
import { Link } from 'react-router-dom';

const BusinessServices: React.FC = () => {
  const services = [
    {
      title: "Business develpment",
      tagline: "Simplify your Business Development process after Deciding to expand your business.",
      description: "We support your business development and partnership growth by actively working alongside you to establish and expand your operations. Whether operating under your company name or representing you confidentially through our network, we postion your business for strategic growth and market entry our support goes beyong promotion, we assist with business registration, compliance, and administrative setup, ensuring your company is properly established and aligned with local requirements. We leverage our networks and digital platforms, including LinkedIn, Twitter, Facebook, and Instahram, to identify and connect you with relevant partners, clients and opportunities. from initial setup to ongoing development, we provide hands-on support to streghtne your presence, build strategic partnerships and drive sustainable growth. ",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658816/business_black_gfgtd9.jpg"
    },
    {
      title: "Partnerships",
      tagline: "Instant access to a pool of partners tailored to your business.",
      description: "Gain access to our partners database. We provide tailored information that match your business organisation.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660425/team_2_g1yj9n.webp"
    },
    {
      title: "Market Research",
      tagline: "Data-driven insights to guide your expansion and partnership strategy.",
      description: "We deliver in-depth market intelligence, competitor analysis, and industry insights to help you identify opportunities, understand target markets, and make informed business and partnership decisions.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660424/black_happy_pexjw7.jpg"
    },
    {
      title: "Logistic services",
      tagline: "Seamless operational support for your business activities and partnerships.",
      description: "We manage logistics, coordination, and operational planning to ensure smooth execution of your business activities, events, and partnership engagements across different markets.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/recruitment_nriehd.webp"
    },
    {
      title: "Digital marketing",
      tagline: "Expand your reach and visibility in target markets.",
      description: "Our digital marketing strategies help position your brand, promote your services, and attract the right partners through targeted campaigns, content marketing, and social media engagement.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658825/team_voz0d0.webp"
    },
    {
      title: "Recruitment and HR Advisory Services",
      tagline: "Strategic Recruitment and partnership sourcing guidance to optimize your organizational performance.",
      description: "Our consultants provide strategic advice on labor laws, organizational design, and performance management systems. We help you build a more effective, compliant, and motivated HR department that drives business growth.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768658817/hr2_hpfjui.webp"
    },
    {
      title: "Strategic Outreach",
      tagline: "Connect with the right stakeholders and decision-makers.",
      description: "We identify, approach, and engage key partners, clients, and stakeholders on your behalf, building strong relationships that open doors to new opportunities.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660424/hr_w0vk2w.webp"
    },
    {
      title: "Admnistration Assistance",
      tagline: "Efficient support to streamline your business operations.",
      description: "We handle documentation, coordination, and administrative processes to ensure your business activities and partnerships run smoothly and efficiently.",
      image: "https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660425/job_fair_tvhgf8.jpg"
    },
    {
      title: "Labour Market Survey",
      tagline: "Insights to support strategic business and partnership decisions.",
      description: "Our surveys provide valuable data on market trends, workforce dynamics, and economic conditions to support your expansion plans and partnership strategies.",
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