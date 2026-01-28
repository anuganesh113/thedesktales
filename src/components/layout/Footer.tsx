import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 overflow-hidden relative">

      {/* Massive Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-bold leading-none text-center text-white whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
          DESK TALES
        </h1>
      </div>

      <div className="container relative z-10 px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block bg-white p-4 rounded-2xl hover:shadow-[0_0_30px_rgba(255,165,0,0.3)] transition-all duration-300 hover:scale-105">
              <img src={logo} alt="The Desk Tales" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm">
              Elevating workspaces with premium, artist-designed desk mats and accessories. Designed for creators, by creators.
            </p>
            <div className="flex gap-6 pt-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-brand-orange hover:bg-white/10 transition-all duration-300 group">
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-medium text-white/90 text-sm tracking-widest uppercase mb-8">Collections</h4>
            <ul className="space-y-4">
              {[
                { name: 'Latest Drops', href: '/products?sort=newest' },
                { name: 'Best Sellers', href: '/products?sort=best-selling' },
                { name: 'Desk Mats', href: '/products?category=desk-mat' },
                { name: 'Mousepads', href: '/products?category=mousepad' },
                { name: 'Accessories', href: '/products?category=accessory' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-brand-orange transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-medium text-white/90 text-sm tracking-widest uppercase mb-8">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Story', href: '/story' },
                { name: 'Designers', href: '/designers' },
                { name: 'Careers', href: '/careers' },
                { name: 'Affiliates', href: '/affiliates' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-medium text-white/90 text-sm tracking-widest uppercase mb-8">Get in Touch</h4>
            <ul className="space-y-6">
              <li>
                <a href="mailto:hello@thedesktales.com" className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wide">Email Us</p>
                    <p className="font-medium text-sm">hello@thedesktales.com</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 text-white/50">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wide">Location</p>
                    <p className="font-medium text-sm">Los Angeles, CA</p>
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/5">
              <Link to="/custom-design" className="inline-flex items-center gap-2 text-brand-yellow hover:text-brand-orange transition-colors font-medium text-sm">
                Submit a Design Request <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/30">
          <p>&copy; 2026 The Desk Tales. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
