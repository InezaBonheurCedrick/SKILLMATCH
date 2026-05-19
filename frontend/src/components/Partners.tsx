import React from 'react';

const partnerImage =
  'https://res.cloudinary.com/dc6iwekzx/image/upload/v1779204917/WhatsApp_Image_2026-05-19_at_3.02.09_PM_nbjvqq.jpg';

const Partners: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-[#2b6cb0] text-2xl md:text-3xl font-bold mb-12">
          Our Partners
        </h2>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-6xl px-4">
            <img
              src={partnerImage}
              alt="Amega Entertainment"
              className="w-full h-auto max-h-24 md:max-h-32 object-contain mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
