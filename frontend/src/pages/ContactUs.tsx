import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#2b6cb0]/20 outline-none transition-all bg-gray-50/30";

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2b6cb0] mb-4">
            Contact Us
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Contact us about anything related to our company or services. 
            We'll do our best to get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="w-full lg:w-2/3 bg-white rounded-2xl p-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                  <input 
                    type="text" 
                    required 
                    className={inputClasses}
                    placeholder="Enter your full name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className={inputClasses}
                    placeholder="+250 ..."
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    required 
                    className={inputClasses}
                    placeholder="name@example.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    placeholder="Your organization"
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                <input 
                  type="text" 
                  required 
                  className={inputClasses}
                  placeholder="How can we help?"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                <textarea 
                  required 
                  rows={5} 
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us more about your inquiry..."
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="bg-[#2a79ad] text-white px-12 py-4 rounded-lg font-bold hover:bg-[#2270a4] transition-all shadow-lg hover:shadow-xl active:scale-95 uppercase tracking-wider text-sm"
              >
                Submit Request
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/3 sticky top-32">
            <div className="bg-[#2b6cb0] rounded-lg p-8 md:p-10 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />

              <h3 className="text-xl font-bold mb-8 border-b border-white/20 pb-4">
                Right Pool Ltd
              </h3>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-100 text-sm uppercase">Address</p>
                    <p>Kigali, Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-100 text-sm uppercase">Phone</p>
                    <a href="tel:+250783487168" className="text-sm hover:underline transition">+250783487168</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-100 text-sm uppercase">Email</p>
                    <a href="mailto:baratimana.k@gmail.com" className="text-sm hover:underline transition">baratimana.k@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-blue-100 text-sm font-medium mb-1">Office Hours</p>
                <p className="text-lg">Monday – Friday</p>
                <p className="text-blue-100/80">9:00 a.m. – 5:00 p.m.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ContactUs;