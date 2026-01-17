import React from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2b79ad] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 w-fit">
              Important Links
            </h3> 
            <ul className="space-y-3 text-white/90">
              <li><a href="https://rdb.rw/" className="hover:text-white hover:translate-x-1 transition-all inline-block">RDB</a></li>
              <li><a href="https://www.mifotra.gov.rw/" className="hover:text-white hover:translate-x-1 transition-all inline-block">MIFOTRA</a></li>
              <li><Link to="/signin" className="hover:text-white hover:translate-x-1 transition-all inline-block">Right Pool Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 w-fit">
              RightPool Ltd
            </h3>
            <div className="space-y-4">
              <p className="font-semibold text-lg">Opening hours</p>
              <p className="text-white/90">Monday - Friday: 9:00 AM - 5:00 PM</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-white/20 pb-2 w-fit">
              Connect with us
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white/80" />
                <a href="mailto:hr@rightpool.com" className="hover:underline">Baratimana.k@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-white/80" />
                <a href="tel:+250783487168" className="hover:underline">+250783487168</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-white/80 mt-1" />
                <span className="text-white/90 leading-tight">Kigali, Rwanda</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#1e5d85] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-white/80">
          <p>Copyright © {currentYear} RightPool Ltd</p>
          <p className="flex items-center gap-2">
            Developed by <span className="bg-white text-[#1e5d85] px-2 py-0.5 rounded text-xs font-bold cursor-pointer"><a href="https://inezabonheurcedrick-web-neon.vercel.app/">B-16</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;