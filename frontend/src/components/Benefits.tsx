import React from 'react';

const Benefits: React.FC = () => {
  const stats = [
    {
      id: 1,
      number: "15+",
      label: "Full recruitment",
      image: "https://hrms.rw/web/image/1086-4a4bd68c/Employee%20Outsourcing.webp"
    },
    {
      id: 2,
      number: "250+",
      label: "Shortlisting",
      image: "https://hrms.rw/web/image/1080-1264f544/Full%20recruitment.webp"
    },
    {
      id: 3,
      number: "400k+",
      label: "Database profiles",
      image: "https://hrms.rw/web/image/1084-729648d0/Job%20Fair%20organization.webp"
    },
    {
      id: 4,
      number: "245+",
      label: "Outsourced staff",
      image: "https://hrms.rw/web/image/1085-70e94ca3/Temporary%20Staffing.webp"
    }
  ];

  return (
    <section className="flex flex-col lg:flex-row w-full min-h-[550px]">
      <div className="bg-[#f0f4f8] lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#2b6cb0] mb-8">
          Companies Benefits
        </h2>
        
        <div className="space-y-6 text-slate-600 text-lg leading-relaxed max-w-md">
          <p>
            Simplifying your screening process after advertising on our portal.
          </p>
          <p>
            Providing you with an efficient and fair recruitment process and ensuring smooth onboarding processes.
          </p>
          <p>
            Sourcing for you the best talent on the market from our database and beyond.
          </p>
        </div>

        <button className="mt-12 bg-[#3182ce] text-white px-10 py-3.5 rounded-sm font-bold text-xs tracking-[0.2em] w-fit hover:bg-[#2c5282] transition-all shadow-md uppercase">
          More Info
        </button>
      </div>

      <div className="bg-white lg:w-1/2 p-12 md:p-20 grid grid-cols-1 sm:grid-cols-2 gap-y-20 gap-x-12 items-center">
        {stats.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 mb-6 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
              <img 
                src={item.image} 
                alt={item.label} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            <span className="text-4xl font-extrabold text-[#2d3748] mb-2 tracking-tight">
              {item.number}
            </span>
            <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;